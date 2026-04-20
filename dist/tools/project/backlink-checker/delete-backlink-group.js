import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteBacklinkGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteBacklinkGroup'), {
            title: 'Delete Backlink Group',
            description: 'Project Tool: Delete a backlink group.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                group_id: z.number().int().describe('Backlink group ID to delete'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest(`/backlink-groups/${params.site_id}`, { id: params.group_id }));
    }
}
//# sourceMappingURL=delete-backlink-group.js.map