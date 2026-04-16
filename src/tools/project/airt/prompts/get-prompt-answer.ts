import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class GetPromptAnswer extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('getPromptAnswer'),
            {
                title: 'Get Prompt Answer',
                description: 'Project Tool: Retrieve the cached AI answer for a tracked prompt on a given date, including answer text, cited source URLs, detected brand mentions, and (for Google AI Overview engines) top organic URLs. Full text is retained for the last 30 days; presence metrics (sources, brands, organic_urls) remain available for the full history. Does not consume API units.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    llm_id: z.number().int().describe('LLM Engine ID'),
                    prompt_llm_id: z.number().int().describe('Prompt ID returned by /prompts or /prompts/rankings'),
                    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Date of the cached answer in YYYY-MM-DD format (defaults to current date)'),
                },
            },
            async (params: {
                site_id: number;
                llm_id: number;
                prompt_llm_id: number;
                date?: string;
            }) => {
                const { site_id, llm_id, prompt_llm_id, ...queryParams } = params;
                return this.makeGetRequest(
                    `/sites/${site_id}/airt/llm/${llm_id}/prompts/${prompt_llm_id}/answer`,
                    queryParams,
                );
            },
        );
    }
}
