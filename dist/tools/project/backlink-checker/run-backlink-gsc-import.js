import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class RunBacklinkGscImport extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('runBacklinkGscImport'), {
            title: 'Run Backlink GSC Import',
            description: 'Project Tool: Start a backlink import from Google Search Console. Returns a token to check import status.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeBodylessPostRequest(`/backlinks/${params.site_id}/import-gsc`));
    }
}
//# sourceMappingURL=run-backlink-gsc-import.js.map