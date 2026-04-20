import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectListAuditSourcePages extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listAuditSourcePages'), {
            title: 'List Audit Source Pages',
            description: 'Project Tool: Returns uploaded custom page lists used as a crawl source for an audit, with per-list page counts. These sources are active only when settings.source_file is 1 (auto-enabled when you add a list).',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/audit/${params.audit_id}/source-pages`, {}));
    }
}
//# sourceMappingURL=list-audit-source-pages.js.map