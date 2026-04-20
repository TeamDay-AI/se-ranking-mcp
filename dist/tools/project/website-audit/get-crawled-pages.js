import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectGetCrawledPages extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getCrawledPages'), {
            title: 'Get Crawled Pages',
            description: 'Project Tool: Returns a paginated list of all URLs found during an audit, providing a complete sitemap as discovered by the crawler.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
                limit: z
                    .number()
                    .int()
                    .optional()
                    .default(100)
                    .describe('Number of pages to return. Default: 100.'),
                offset: z
                    .number()
                    .int()
                    .optional()
                    .default(0)
                    .describe('Starting position for the list. Default: 0.'),
            },
            annotations: this.annotations('read'),
        }, async ({ audit_id, ...params }) => this.makeGetRequest(`/audit/${audit_id}/pages`, params));
    }
}
//# sourceMappingURL=get-crawled-pages.js.map