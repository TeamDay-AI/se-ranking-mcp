import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteKeywordGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteKeywordGroup'), {
            title: 'Delete Keyword Group',
            description: 'Project Tool: Requires a project ID. Delete a project keyword group.',
            inputSchema: {
                group_id: z.number().int().describe('ID of the keyword group to delete'),
            },
            annotations: this.annotations('destructive'),
        }, async ({ group_id }) => 
        // DELETE /keyword-groups/{group_id}
        this.makeDeleteRequest(`/keyword-groups/${group_id}`, {}));
    }
}
//# sourceMappingURL=delete-keyword-group.js.map