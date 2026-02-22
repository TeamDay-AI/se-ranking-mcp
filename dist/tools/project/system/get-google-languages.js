import { ApiType, BaseTool } from '../../base-tool.js';
export class GetGoogleLanguages extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getGoogleLanguages'), {
            title: 'Get Google Languages',
            description: 'Project Tool: Get a complete list of possible languages for the Google search engine with their codes.',
            inputSchema: {},
        }, async () => this.makeGetRequest('/system/google-langs', {}));
    }
}
//# sourceMappingURL=get-google-languages.js.map