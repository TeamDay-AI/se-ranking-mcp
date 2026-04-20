import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectGetAuditStatus extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getAuditStatus'), {
            title: 'Get Audit Status',
            description: 'Project Tool: Check the real-time status of a specific website audit (queued, processing, finished, cancelled, expired).',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/audit/${params.audit_id}/`, {}));
    }
}
//# sourceMappingURL=get-audit-status.js.map