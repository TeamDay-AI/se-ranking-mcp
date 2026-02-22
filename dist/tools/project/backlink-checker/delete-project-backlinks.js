import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteProjectBacklinks extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteProjectBacklinks'), {
            title: 'Delete Project Backlinks',
            description: 'Project Tool: Delete a list of backlinks from the backlink monitor.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                backlink_ids: z.array(z.number().int()).describe('Array of backlink IDs to delete'),
            },
        }, async (params) => {
            const { site_id, backlink_ids } = params;
            return this.makeJsonPostRequest(`/backlinks/${site_id}/delete`, { backlink_ids });
        });
    }
}
//# sourceMappingURL=delete-project-backlinks.js.map