import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetSubAccountDetails extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getSubAccountDetails'), {
            title: 'Get Sub-Account Details',
            description: 'Project Tool: Get extended information about a sub-account including settings, access permissions, and limits.',
            inputSchema: {
                id: z.number().int().describe('Unique sub-account ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/users/${params.id}`, {}));
    }
}
//# sourceMappingURL=get-sub-account-details.js.map