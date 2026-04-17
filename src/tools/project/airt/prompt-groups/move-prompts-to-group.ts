import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class MovePromptsToGroup extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('movePromptsToGroup'),
            {
                title: 'Move Prompts to Group',
                description: 'Project Tool: Move AI Result Tracker prompts (by k2site_llm_id) into the specified prompt group.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    group_id: z.number().int().describe('Destination prompt group ID'),
                    k2site_llm_ids: z.array(z.number().int()).min(1).describe('Array of k2site_llm_id values to move (from list-prompts)'),
                },
                annotations: this.annotations('write'),
            },
            async (params: { site_id: number; group_id: number; k2site_llm_ids: number[] }) =>
                this.makeJsonPostRequest(
                    `/sites/${params.site_id}/airt/prompt-groups/${params.group_id}/moveKeywords`,
                    { k2site_llm_ids: params.k2site_llm_ids },
                ),
        );
    }
}
