import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class GetSerpResults extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getSerpResults'), {
            title: 'Get SERP results',
            description: 'Data Tool: Runs a SERP query and returns results. Creates task, polls every 5 seconds until complete (5 min timeout), and returns organic/ads/featured snippets (standard) or all SERP types including AI Overview, Maps, Reviews (advanced). Supports progress notifications.',
            inputSchema: {
                search_engine: z.enum(['google']).default('google').describe('Search engine'),
                device: z.enum(['desktop']).default('desktop').describe('Device type'),
                language_code: z
                    .string()
                    .min(2, 'language_code is required and must be alpha-2 language code')
                    .max(2, 'language_code must be alpha-2 language code')
                    .describe('Language code'),
                location_id: z
                    .number()
                    .int()
                    .positive()
                    .describe('Location ID from SERP locations method'),
                query: z
                    .array(z.string().min(1, 'query is empty').max(1000, 'too many queries'))
                    .describe('List of queries'),
                tag: z.string().max(255, 'tag is too long (max 255 chars)').optional().describe('Tag'),
                pingback_url: z
                    .string()
                    .optional()
                    .describe('URL to receive a pingback when the task is complete. Supports $id and $tag placeholders that will be substituted with the task ID and tag (e.g., "https://example.com/callback?id=$id&user_tag=$tag").'),
                poll_interval_ms: z
                    .number()
                    .int()
                    .min(1000)
                    .max(30000)
                    .default(5000)
                    .describe('Polling interval in milliseconds (default: 5000)'),
                max_wait_ms: z
                    .number()
                    .int()
                    .min(10000)
                    .max(600000)
                    .default(300000)
                    .describe('Maximum wait time in milliseconds (default: 300000 = 5 minutes)'),
                result_type: z
                    .enum(['standard', 'advanced'])
                    .default('standard')
                    .describe("Result type: 'standard' for organic/ads/featured_snippet, 'advanced' for all SERP types (costs 10 credits)"),
            },
            annotations: this.annotations('read'),
        }, async (params, extra) => {
            const { search_engine, device, language_code, location_id, query, tag, pingback_url, poll_interval_ms, max_wait_ms, result_type, } = params;
            const progressToken = extra._meta?.progressToken;
            // Helper to send progress notification
            const sendProgress = async (progress, total, message) => {
                if (progressToken !== undefined) {
                    await extra.sendNotification({
                        method: 'notifications/progress',
                        params: {
                            progressToken,
                            progress,
                            total,
                            message,
                        },
                    });
                }
            };
            // Step 1: Add the SERP task
            await sendProgress(0, 100, 'Creating SERP task...');
            const form = {
                search_engine,
                device,
                language_code,
                location_id,
                query,
            };
            if (tag)
                form.tag = tag;
            if (pingback_url)
                form.pingback_url = pingback_url;
            const tasks = await this.addSerpTask(form);
            // API returns an array of created tasks - get the first one's ID
            const taskId = tasks[0]?.id;
            if (!taskId) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: JSON.stringify({ error: 'Failed to create SERP task - no task ID returned', response: tasks }, null, 2),
                        },
                    ],
                };
            }
            await sendProgress(10, 100, `Task created with ID: ${taskId}. Waiting for results...`);
            // Step 2: Poll for completion every 5 seconds
            const startTime = Date.now();
            let pollCount = 0;
            const maxPolls = Math.ceil(max_wait_ms / poll_interval_ms);
            while (Date.now() - startTime < max_wait_ms) {
                // Wait before checking (give task time to process)
                await this.sleep(poll_interval_ms);
                pollCount++;
                // Calculate progress (10-90% range for polling phase)
                const elapsedPercent = Math.min(((Date.now() - startTime) / max_wait_ms) * 80, 80);
                const currentProgress = Math.round(10 + elapsedPercent);
                await sendProgress(currentProgress, 100, `Checking results... (attempt ${pollCount}/${maxPolls})`);
                // Check task status - use standard or advanced based on result_type
                const statusResponse = result_type === 'advanced'
                    ? await this.getSerpTaskAdvancedResults(taskId)
                    : await this.getSerpTaskStatus(taskId);
                // Task is complete if status is not "processing"
                const isProcessing = statusResponse?.status === 'processing';
                if (!isProcessing) {
                    // Task completed - return results
                    await sendProgress(100, 100, 'Done!');
                    return {
                        content: [
                            {
                                type: 'text',
                                text: JSON.stringify({
                                    task_id: taskId,
                                    polling_attempts: pollCount,
                                    elapsed_ms: Date.now() - startTime,
                                    result_type,
                                    results: statusResponse,
                                }, null, 2),
                            },
                        ],
                    };
                }
            }
            // Timeout - return partial info
            await sendProgress(100, 100, 'Timeout reached');
            return {
                content: [
                    {
                        type: 'text',
                        text: JSON.stringify({
                            error: 'Task did not complete within timeout',
                            task_id: taskId,
                            polling_attempts: pollCount,
                            elapsed_ms: Date.now() - startTime,
                            suggestion: "Use 'getSerpTaskResults' or 'getSerpTaskAdvancedResults' to check task status later",
                        }, null, 2),
                    },
                ],
            };
        });
    }
    async addSerpTask(body) {
        const response = await this.makeJsonPostRequest('/v1/serp/classic/tasks', body);
        return JSON.parse(response.content[0].text);
    }
    async getSerpTaskStatus(taskId) {
        const response = await this.makeGetRequest('/v1/serp/classic/tasks', { task_id: taskId });
        return JSON.parse(response.content[0].text);
    }
    async getSerpTaskAdvancedResults(taskId) {
        const response = await this.makeGetRequest('/v1/serp/classic/tasks/results_advanced', {
            task_id: taskId,
        });
        return JSON.parse(response.content[0].text);
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}
//# sourceMappingURL=serp-get-results.js.map