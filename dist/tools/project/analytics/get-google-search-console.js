import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetGoogleSearchConsole extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getGoogleSearchConsole'), {
            title: 'Get Google Search Console Data',
            description: 'Project Tool: Get popular queries from Google Search Console for a website.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
        }, async (params) => this.makeGetRequest(`/analytics/${params.site_id}/google/`, {}));
    }
}
//# sourceMappingURL=get-google-search-console.js.map