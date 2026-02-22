import { ApiType, BaseTool } from '../../base-tool.js';
export class ListProjects extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listProjects'), {
            title: 'List Projects',
            description: 'Project Tool: Requires a project ID. Get a list of all user projects.',
            inputSchema: {},
        }, async () => this.makeGetRequest('/sites', {}));
    }
}
//# sourceMappingURL=list-projects.js.map