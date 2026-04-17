import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class RecheckProjectBacklinks extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('recheckProjectBacklinks'),
            {
                title: 'Recheck Project Backlinks',
                description: 'Project Tool: Run an index or status check for a list of backlinks. NOTE: the ID required here is the row `id` returned by `listProjectBacklinks`, NOT the value returned by `addProjectBacklink` (which is the `backlink_id` dictionary key). Passing `backlink_id` values yields "Backlinks are non exists".',
                inputSchema: {
                    site_id: z.number().int().describe('Unique website ID'),
                    backlink_ids: z
                        .array(z.number().int())
                        .describe(
                            'Row-level backlink IDs to recheck. Use the `id` field from `listProjectBacklinks` (NOT `backlink_id`, and NOT the id returned by `addProjectBacklink`).',
                        ),
                    recheck_type: z.enum(['status', 'index']).optional().describe('Check type (default: status)'),
                },
                annotations: this.annotations('write'),
            },
            async (params: { site_id: number; backlink_ids: number[]; recheck_type?: 'status' | 'index' }) => {
                const { site_id, ...body } = params;
                return this.makeJsonPostRequest(`/backlinks/${site_id}/recheck`, body);
            },
        );
    }
}
