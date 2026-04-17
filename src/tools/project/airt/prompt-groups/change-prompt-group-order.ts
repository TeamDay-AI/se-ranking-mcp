import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class ChangePromptGroupOrder extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('changePromptGroupOrder'),
            {
                title: 'Change Prompt Group Order',
                description: 'Project Tool: Reorder an AI Result Tracker prompt group relative to another. Specify exactly one of before_id or after_id.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    group_id: z.number().int().describe('ID of the group being moved'),
                    before_id: z.number().int().optional().describe('Place current group before this neighbour group ID'),
                    after_id: z.number().int().optional().describe('Place current group after this neighbour group ID'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: {
                site_id: number;
                group_id: number;
                before_id?: number;
                after_id?: number;
            }) => {
                const { site_id, group_id, ...body } = params;
                if ((body.before_id == null) === (body.after_id == null)) {
                    throw new McpError(
                        ErrorCode.InvalidParams,
                        'Provide exactly one of before_id or after_id.',
                    );
                }
                return this.makeJsonPostRequest(
                    `/sites/${site_id}/airt/prompt-groups/${group_id}/order`,
                    body,
                );
            },
        );
    }
}
