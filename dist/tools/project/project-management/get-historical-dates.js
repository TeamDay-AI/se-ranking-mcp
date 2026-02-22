import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetHistoricalDates extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getHistoricalDates'), {
            title: 'Get Historical Dates',
            description: 'Project Tool: Returns standard comparison dates (e.g., yesterday, last month, etc.) available for reporting.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                site_engine_id: z.number().int().describe('Search engine ID filter'),
            },
        }, async ({ site_id, ...params }) => 
        // GET https://api4.seranking.com/sites/{site_id}/historicalDates
        this.makeGetRequest(`/sites/${site_id}/historicalDates`, params));
    }
}
//# sourceMappingURL=get-historical-dates.js.map