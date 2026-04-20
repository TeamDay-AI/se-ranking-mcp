import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectDeleteAudit extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteAudit'), {
            title: 'Delete Audit',
            description: 'Project Tool: Permanently deletes a website audit report and all associated data. This action cannot be undone.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit to delete.'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeBodylessPostRequest(`/audit/${params.audit_id}/delete`));
    }
}
//# sourceMappingURL=delete-audit.js.map