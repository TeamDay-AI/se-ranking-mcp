import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class CreateProjectGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('createProjectGroup'), {
            title: 'Create Project Group',
            description: 'Project Tool: Requires a project ID. Add a new project group to a user account.',
            inputSchema: {
                name: z.string().min(1).describe('Name of the project group to be added'),
            },
        }, async (params) => this.makeJsonPostRequest('/site-groups', params));
    }
}
//# sourceMappingURL=create-project-group.js.map