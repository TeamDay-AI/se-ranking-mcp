import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class ListPromptGroups extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('listPromptGroups'),
            {
                title: 'List Prompt Groups',
                description: 'Project Tool: List AI Result Tracker prompt groups for a site (ordered by position). Optionally include per-group prompt counts or filter to groups used by specific LLM engines.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    keys_count: z.enum(['0', '1']).optional().describe('If "1", include keys_count (number of prompts) per group'),
                    site_llm_ids: z.array(z.number().int()).optional().describe('Filter to groups used by these LLM engine IDs'),
                },
                annotations: this.annotations('read'),
            },
            async (params: {
                site_id: number;
                keys_count?: '0' | '1';
                site_llm_ids?: number[];
            }) => {
                const { site_id, ...queryParams } = params;
                return this.makeGetRequest(`/sites/${site_id}/airt/prompt-groups`, queryParams);
            },
        );
    }
}
