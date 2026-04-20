import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetBacklinkGscImportStatus extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getBacklinkGscImportStatus'), {
            title: 'Get Backlink GSC Import Status',
            description: 'Project Tool: Get the status of a backlink import from Google Search Console.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                token: z.string().describe('Import task token obtained from runBacklinkGscImport'),
            },
            annotations: this.annotations('read'),
        }, async (params) => {
            const { site_id, token } = params;
            return this.makeGetRequest(`/backlinks/${site_id}/import-gsc`, { token });
        });
    }
}
//# sourceMappingURL=get-backlink-gsc-import-status.js.map