import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class RecheckProjectBacklinks extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('recheckProjectBacklinks'), {
            title: 'Recheck Project Backlinks',
            description: 'Project Tool: Run an index or status check for a list of backlinks.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                backlink_ids: z.array(z.number().int()).describe('Array of backlink IDs to recheck'),
                recheck_type: z.enum(['status', 'index']).optional().describe('Check type (default: status)'),
            },
        }, async (params) => {
            const { site_id, ...body } = params;
            return this.makeJsonPostRequest(`/backlinks/${site_id}/recheck`, body);
        });
    }
}
//# sourceMappingURL=recheck-project-backlinks.js.map