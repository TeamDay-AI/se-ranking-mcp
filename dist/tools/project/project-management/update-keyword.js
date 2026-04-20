import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class UpdateKeyword extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('updateKeyword'), {
            title: 'Update Keyword',
            description: 'Project Tool: Update a single project keyword (rename, change group, change target URL, toggle strict matching, update comment, or change which search engines track it).',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                keyword_id: z.number().int().describe('Keyword ID'),
                keyword: z.string().min(1).optional().describe('Keyword (query) text. Required on most updates; the server accepts PATCH without it only when toggling is_strict alone.'),
                group_id: z.number().int().optional().describe('Keyword group ID'),
                target_url: z.string().optional().describe('Target URL'),
                is_strict: z.boolean().optional().describe('Only count positions for the specified target URL'),
                comment: z.string().optional().describe('Comment'),
                site_engine_ids: z.array(z.number().int()).optional().describe('Site search engine IDs that should track this keyword'),
            },
            annotations: this.annotations('writeIdempotent'),
        }, async (params) => {
            const { site_id, keyword_id, ...body } = params;
            return this.makePatchRequest(`/sites/${site_id}/keywords/${keyword_id}`, {}, body);
        });
    }
}
//# sourceMappingURL=update-keyword.js.map