import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteProjectGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteProjectGroup'), {
            title: 'Delete Project Group',
            description: 'Project Tool: Requires a project ID. Delete a project group.',
            inputSchema: {
                group_id: z.number().int().describe('ID of the project group to delete'),
            },
            annotations: this.annotations('destructive'),
        }, async ({ group_id }) => this.makeDeleteRequest(`/site-groups/${group_id}`, {}));
    }
}
//# sourceMappingURL=delete-project-group.js.map