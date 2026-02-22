import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListKeywordGroups extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listKeywordGroups'), {
            title: 'List Keyword Groups',
            description: 'Project Tool: Requires a project ID. Get a list of keyword groups for a specified project.',
            inputSchema: {
                site_id: z.number().int().describe('ID of the project'),
            },
        }, async ({ site_id }) => 
        // GET /keyword-groups/{site_id}
        this.makeGetRequest(`/keyword-groups/${site_id}`, {}));
    }
}
//# sourceMappingURL=list-keyword-groups.js.map