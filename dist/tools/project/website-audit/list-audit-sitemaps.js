import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectListAuditSitemaps extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listAuditSitemaps'), {
            title: 'List Audit Sitemaps',
            description: 'Project Tool: Returns all sitemap URLs configured as crawl sources for an audit, with per-sitemap page counts. These sources are active only when settings.source_sitemap is 1 (auto-enabled when you add a sitemap).',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/audit/${params.audit_id}/sitemaps`, {}));
    }
}
//# sourceMappingURL=list-audit-sitemaps.js.map