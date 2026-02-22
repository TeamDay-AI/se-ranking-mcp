import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class AddProjectBacklink extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('addProjectBacklink'), {
            title: 'Add Project Backlink',
            description: 'Project Tool: Add a single backlink to the backlink monitor for a website.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                url: z.string().url().describe('Backlink URL'),
                price: z.number().optional().describe('Backlink price'),
                currency: z.string().optional().describe('Currency code ISO 4217 (USD, CAD, AUD, etc.)'),
                charge_period: z.enum(['onetime', 'monthly', 'quarterly', '6months', 'year']).optional().describe('Payment period'),
                charge_start: z.string().optional().describe('Payment start date (YYYY-MM-DD)'),
            },
        }, async (params) => {
            const { site_id, ...body } = params;
            return this.makeJsonPostRequest(`/backlinks/${site_id}`, body);
        });
    }
}
//# sourceMappingURL=add-project-backlink.js.map