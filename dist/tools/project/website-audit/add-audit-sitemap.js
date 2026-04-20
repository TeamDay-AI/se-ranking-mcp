import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectAddAuditSitemap extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('addAuditSitemap'), {
            title: 'Add Audit Sitemap',
            description: 'Project Tool: Adds a sitemap URL as a crawl source for an audit. Automatically sets settings.source_sitemap to 1 so the audit will actually use the sitemap on the next run.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
                url: z.string().describe('Absolute URL of the sitemap (e.g., https://example.com/sitemap.xml).'),
            },
            annotations: this.annotations('write'),
        }, async (params) => {
            const { audit_id, ...body } = params;
            return this.makeJsonPostRequest(`/audit/${audit_id}/sitemaps`, body);
        });
    }
}
//# sourceMappingURL=add-audit-sitemap.js.map