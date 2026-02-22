import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListBacklinkGroups extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listBacklinkGroups'), {
            title: 'List Backlink Groups',
            description: 'Project Tool: Get a list and count of backlink groups for a website.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
        }, async (params) => this.makeGetRequest(`/backlink-groups/${params.site_id}`, {}));
    }
}
//# sourceMappingURL=list-backlink-groups.js.map