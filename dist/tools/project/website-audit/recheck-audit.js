import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectRecheckAudit extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('recheckAudit'), {
            title: 'Recheck Audit',
            description: 'Project Tool: Initiates a new crawl for a previously completed audit using the same settings. Consumes the same credits as creating a new audit.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit to recheck.'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeBodylessPostRequest(`/audit/${params.audit_id}/recheck`));
    }
}
//# sourceMappingURL=recheck-audit.js.map