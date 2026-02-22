import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListProjectBacklinks extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listProjectBacklinks'), {
            title: 'List Project Backlinks',
            description: 'Project Tool: Get a list of backlinks for a website from the backlink monitor.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                limit: z.number().int().max(1000).optional().describe('Total number of links (max 1000)'),
                offset: z.number().int().optional().describe('Offset value for pagination'),
            },
        }, async (params) => {
            const { site_id, ...queryParams } = params;
            return this.makeGetRequest(`/backlinks/${site_id}`, queryParams);
        });
    }
}
//# sourceMappingURL=list-project-backlinks.js.map