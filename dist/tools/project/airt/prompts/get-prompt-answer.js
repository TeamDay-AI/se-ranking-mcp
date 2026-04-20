import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class GetPromptAnswer extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getPromptAnswer'), {
            title: 'Get Prompt Answer',
            description: 'Project Tool: Retrieve the cached AI answer for a tracked prompt on a given date, including answer text, cited source URLs, detected brand mentions, and (for Google AI Overview engines) top organic URLs. Answer data is retained for the last year; older dates return 400. Date defaults to the current date and cannot exceed it.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                llm_id: z.number().int().describe('LLM Engine ID'),
                prompt_llm_id: z.number().int().describe('Prompt ID — pass the `k2site_llm_id` value from /prompts. The `keyword_id` field in that same response is NOT accepted by this endpoint (returns 404). /prompts/rankings does not expose this ID. In the /answer response the same value is returned as `prompt_llm_id`.'),
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date of the cached answer in YYYY-MM-DD format (defaults to current date)'),
            },
            annotations: this.annotations('read'),
        }, async (params) => {
            const { site_id, llm_id, prompt_llm_id, ...queryParams } = params;
            return this.makeGetRequest(`/sites/${site_id}/airt/llm/${llm_id}/prompts/${prompt_llm_id}/answer`, queryParams);
        });
    }
}
//# sourceMappingURL=get-prompt-answer.js.map