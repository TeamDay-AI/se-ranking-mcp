import { ApiType, BaseTool } from '../../base-tool.js';
export class ListProjectGroups extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listProjectGroups'), {
            title: 'List Project Groups',
            description: 'Project Tool: Requires a project ID. Get a list of all project groups from a user account.',
            inputSchema: {},
            annotations: this.annotations('read'),
        }, async () => this.makeGetRequest('/site-groups', {}));
    }
}
//# sourceMappingURL=list-project-groups.js.map