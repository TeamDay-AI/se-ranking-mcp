import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectGetAuditReport extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getAuditReport'), {
            title: 'Get Audit Report',
            description: 'Project Tool: Retrieves the full detailed report for a completed website audit, including health score, domain properties, and section-by-section breakdown of all checks.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/audit/${params.audit_id}/report`, {}));
    }
}
//# sourceMappingURL=get-audit-report.js.map