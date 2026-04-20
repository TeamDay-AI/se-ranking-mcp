import { ApiType, BaseTool } from '../../base-tool.js';
export class GetVolumeRegions extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getVolumeRegions'), {
            title: 'Get Volume Regions',
            description: 'Project Tool: Get a list of all regions where SE Ranking can run a keyword search volume check.',
            inputSchema: {},
            annotations: this.annotations('read'),
        }, async () => this.makeGetRequest('/system/volume-regions', {}));
    }
}
//# sourceMappingURL=get-volume-regions.js.map