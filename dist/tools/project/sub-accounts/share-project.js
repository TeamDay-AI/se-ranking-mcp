import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ShareProject extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('shareProject'), {
            title: 'Share Project with Sub-Account',
            description: 'Project Tool: Share one or more websites with a sub-account.',
            inputSchema: {
                id: z.number().int().describe('Unique sub-account ID'),
                site_ids: z.array(z.number().int()).describe('Array of website IDs to share'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeJsonPostRequest(`/users/${params.id}/shared-sites`, params.site_ids));
    }
}
//# sourceMappingURL=share-project.js.map