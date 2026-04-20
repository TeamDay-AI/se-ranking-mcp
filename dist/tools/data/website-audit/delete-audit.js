import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class DeleteAudit extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('deleteAudit'), {
            title: 'Delete Audit',
            description: 'Data Tool: Permanently deletes a specified website audit report and all of its associated data.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit to delete.'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest('/v1/site-audit/audits', params));
    }
}
//# sourceMappingURL=delete-audit.js.map