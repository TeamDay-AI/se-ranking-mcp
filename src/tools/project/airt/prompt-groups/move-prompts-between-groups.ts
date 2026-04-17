import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class MovePromptsBetweenGroups extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('movePromptsBetweenGroups'),
            {
                title: 'Move All Prompts Between Groups',
                description: 'Project Tool: Move every AI Result Tracker prompt from one group to another for a site.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    from_group_id: z.number().int().describe('Source prompt group ID'),
                    to_group_id: z.number().int().describe('Destination prompt group ID'),
                },
                annotations: this.annotations('write'),
            },
            async (params: { site_id: number; from_group_id: number; to_group_id: number }) => {
                const { site_id, ...body } = params;
                return this.makeJsonPostRequest(
                    `/sites/${site_id}/airt/prompt-groups/moveGroupKeywords`,
                    body,
                );
            },
        );
    }
}
