import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class DeleteAllPromptsInGroup extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('deleteAllPromptsInGroup'),
            {
                title: 'Delete All Prompts in Group',
                description: 'Project Tool: Remove all prompts (keyword rows) linked to an AI Result Tracker prompt group.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    group_id: z.number().int().describe('Prompt group ID'),
                },
                annotations: this.annotations('destructive'),
            },
            async (params: { site_id: number; group_id: number }) =>
                this.makeDeleteRequest(
                    `/sites/${params.site_id}/airt/prompt-groups/${params.group_id}/keywords`,
                    {},
                ),
        );
    }
}
