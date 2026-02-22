import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class RenameBacklinkGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('renameBacklinkGroup'), {
            title: 'Rename Backlink Group',
            description: 'Project Tool: Change the name of a backlink group.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                group_id: z.number().int().describe('Backlink group ID to rename'),
                name: z.string().describe('New name for the backlink group'),
            },
        }, async (params) => {
            const { site_id, group_id, name } = params;
            return this.makePutRequest(`/backlink-groups/${site_id}`, { id: group_id, name });
        });
    }
}
//# sourceMappingURL=rename-backlink-group.js.map