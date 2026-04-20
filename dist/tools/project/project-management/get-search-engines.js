import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetSearchEngines extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getSearchEngines'), {
            title: 'Get Search Engines',
            description: 'Project Tool: Requires a project ID. Get a list of search engines employed by a project.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
            annotations: this.annotations('read'),
        }, async ({ site_id }) => 
        // GET https://api4.seranking.com/sites/{site_id}/search-engines
        this.makeGetRequest(`/sites/${site_id}/search-engines`, {}));
    }
}
//# sourceMappingURL=get-search-engines.js.map