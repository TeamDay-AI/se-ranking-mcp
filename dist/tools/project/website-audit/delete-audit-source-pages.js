import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectDeleteAuditSourcePages extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteAuditSourcePages'), {
            title: 'Delete Audit Source Pages',
            description: 'Project Tool: Removes an uploaded source-pages list from an audit. Does not toggle source_file off — leave that to updateAuditSettings if you want to disable custom-list crawling entirely.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
                list_id: z
                    .number()
                    .int()
                    .describe('Identifier of the source-pages list to remove (from listAuditSourcePages).'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest(`/audit/${params.audit_id}/source-pages/${params.list_id}`, {}));
    }
}
//# sourceMappingURL=delete-audit-source-pages.js.map