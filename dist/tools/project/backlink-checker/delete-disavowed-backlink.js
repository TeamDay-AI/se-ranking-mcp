import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteDisavowedBacklink extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteDisavowedBacklink'), {
            title: 'Delete Disavowed Backlink',
            description: 'Project Tool: Remove a backlink from the disavowed backlinks list.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                disavow_link_id: z.number().int().describe('Disavowed backlink ID to delete'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest(`/backlink-disavow/${params.site_id}`, { id: params.disavow_link_id }));
    }
}
//# sourceMappingURL=delete-disavowed-backlink.js.map