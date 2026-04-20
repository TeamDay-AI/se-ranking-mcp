import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListSharedProjects extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listSharedProjects'), {
            title: 'List Shared Projects',
            description: 'Project Tool: Get a list of website IDs that are shared with a sub-account.',
            inputSchema: {
                id: z.number().int().describe('Unique sub-account ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/users/${params.id}/shared-sites`, {}));
    }
}
//# sourceMappingURL=list-shared-projects.js.map