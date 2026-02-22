import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListPlanItems extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listPlanItems'), {
            title: 'List Marketing Plan Items',
            description: 'Project Tool: Get a list of all marketing plan sections, items, and notes for a website.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
        }, async (params) => this.makeGetRequest(`/checklist/${params.site_id}`, {}));
    }
}
//# sourceMappingURL=list-plan-items.js.map