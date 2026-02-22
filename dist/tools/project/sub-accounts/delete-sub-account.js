import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteSubAccount extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteSubAccount'), {
            title: 'Delete Sub-Account',
            description: 'Project Tool: Delete a user sub-account.',
            inputSchema: {
                id: z.number().int().describe('Unique sub-account ID to delete'),
            },
        }, async (params) => this.makeDeleteRequest(`/users/${params.id}`, {}));
    }
}
//# sourceMappingURL=delete-sub-account.js.map