import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetCompetitorTop10 extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getCompetitorTop10'), {
            title: 'Get Competitor Top 10',
            description: 'Project Tool: Requires a project ID (site_id). Get a list of the TOP 10 results for the keywords that are tracked in a project.',
            inputSchema: {
                site_id: z.number().describe('Unique project ID'),
                date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).describe('Date of getting a list of sites from the TOP 10 (yyyy-mm-dd)'),
                site_engine_id: z.number().describe('The ID of the search_engine specified in the project'),
                keyword_id: z.number().describe('The ID of the query added to the project'),
            },
        }, async (args) => {
            const { site_id, ...params } = args;
            return this.makeGetRequest(`/competitors/top10/${site_id}/`, params);
        });
    }
}
//# sourceMappingURL=get-competitor-top10.js.map