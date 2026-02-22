import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteProject extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteProject'), {
            title: 'Delete Project',
            description: 'Project Tool: Requires a project ID. Delete a project from the user account.',
            inputSchema: {
                site_id: z.number().int().describe('Unique site ID to delete'),
            },
        }, async ({ site_id }) => this.makeDeleteRequest(`/sites/${site_id}`, {}));
    }
}
//# sourceMappingURL=delete-project.js.map