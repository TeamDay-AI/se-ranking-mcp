import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListDisavowedBacklinks extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listDisavowedBacklinks'), {
            title: 'List Disavowed Backlinks',
            description: 'Project Tool: Get a list and count of disavowed backlinks for a website.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                limit: z.number().int().optional().describe('Number of disavowed backlinks to return'),
                offset: z.number().int().optional().describe('Offset for pagination'),
            },
        }, async (params) => {
            const { site_id, ...queryParams } = params;
            return this.makeGetRequest(`/backlink-disavow/${site_id}`, queryParams);
        });
    }
}
//# sourceMappingURL=list-disavowed-backlinks.js.map