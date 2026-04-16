import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class UpdateKeyword extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('updateKeyword'),
            {
                title: 'Update Keyword',
                description: 'Project Tool: Update a single project keyword (rename, change group, change target URL, toggle strict matching, update comment, or change which search engines track it).',
                inputSchema: {
                    site_id: z.number().int().describe('Unique website ID'),
                    keyword_id: z.number().int().describe('Keyword ID'),
                    keyword: z.string().min(1).describe('Keyword (query) text'),
                    group_id: z.number().int().optional().describe('Keyword group ID'),
                    target_url: z.string().optional().describe('Target URL'),
                    is_strict: z.boolean().optional().describe('Only count positions for the specified target URL'),
                    comment: z.string().optional().describe('Comment'),
                    site_engine_ids: z.array(z.number().int()).optional().describe('Site search engine IDs that should track this keyword'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: {
                site_id: number;
                keyword_id: number;
                keyword: string;
                group_id?: number;
                target_url?: string;
                is_strict?: boolean;
                comment?: string;
                site_engine_ids?: number[];
            }) => {
                const { site_id, keyword_id, ...body } = params;
                return this.makePatchRequest(`/sites/${site_id}/keywords/${keyword_id}`, {}, body);
            },
        );
    }
}
