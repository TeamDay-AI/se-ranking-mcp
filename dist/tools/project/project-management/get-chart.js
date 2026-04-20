import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetChart extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getChart'), {
            title: 'Get Rankings Chart',
            description: 'Project Tool: Time-series data for the historical positions chart. Returns one series per search engine plus an overall average, each with [{date, value}] points. Use type to select which metric to chart.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                site_engine_id: z.number().int().optional().describe('Limit to a single project search engine'),
                date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Start date (YYYY-MM-DD)'),
                date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('End date (YYYY-MM-DD)'),
                type: z.enum(['avg_pos', 'visibility', 'visibility_percent', 'top10', 'top10_percent']).optional().describe('Chart metric (default avg_pos)'),
                group_id: z.number().int().optional().describe('Filter to a keyword group ID'),
                keywords_ids: z.array(z.number().int()).optional().describe('Filter to specific keyword IDs'),
                tags_ids: z.array(z.number().int()).optional().describe('Filter to specific tag IDs'),
            },
            annotations: this.annotations('read'),
        }, async ({ site_id, ...params }) => this.makeGetRequest(`/sites/${site_id}/chart`, params));
    }
}
//# sourceMappingURL=get-chart.js.map