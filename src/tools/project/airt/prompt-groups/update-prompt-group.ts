import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class UpdatePromptGroup extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('updatePromptGroup'),
            {
                title: 'Rename Prompt Group',
                description: 'Project Tool: Rename an AI Result Tracker prompt group.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    group_id: z.number().int().describe('Prompt group ID'),
                    name: z.string().min(1).max(255).describe('New group name (non-empty, max 255 characters)'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: { site_id: number; group_id: number; name: string }) =>
                this.makePatchRequest(
                    `/sites/${params.site_id}/airt/prompt-groups/${params.group_id}`,
                    {},
                    { name: params.name },
                ),
        );
    }
}
