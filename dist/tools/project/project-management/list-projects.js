import { ApiType, BaseTool } from '../../base-tool.js';
export class ListProjects extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listProjects'), {
            title: 'List Projects',
            description: 'Project Tool: Get a list of all user projects.',
            inputSchema: {},
            annotations: this.annotations('read'),
        }, async () => this.makeGetRequest('/sites', {}));
    }
}
//# sourceMappingURL=list-projects.js.map