import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteSearchEngine extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteSearchEngine'), {
            title: 'Delete Search Engine',
            description: 'Project Tool: Delete a search engine from a project.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                site_engine_id: z.number().int().describe('Unique search engine ID within the project to delete'),
            },
        }, async ({ site_id, site_engine_id }) => 
        // DELETE https://api4.seranking.com/sites/{site_id}/search-engines/{site_engine_id}
        this.makeDeleteRequest(`/sites/${site_id}/search-engines/${site_engine_id}`, {}));
    }
}
//# sourceMappingURL=delete-search-engine.js.map