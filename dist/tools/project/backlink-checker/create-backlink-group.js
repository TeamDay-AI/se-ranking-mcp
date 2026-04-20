import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class CreateBacklinkGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('createBacklinkGroup'), {
            title: 'Create Backlink Group',
            description: 'Project Tool: Create a new group for organizing backlinks.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                name: z.string().describe('Name for the new backlink group'),
            },
            annotations: this.annotations('write'),
        }, async (params) => {
            const { site_id, name } = params;
            return this.makeJsonPostRequest(`/backlink-groups/${site_id}`, { name });
        });
    }
}
//# sourceMappingURL=create-backlink-group.js.map