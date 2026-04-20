import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListTags extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listTags'), {
            title: 'List Tags',
            description: 'Project Tool: Requires a project ID. Get a list of landing page tags that are added to domains and/or links.',
            inputSchema: {
                site_id: z.number().int().describe('Website ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => 
        // GET /sites/{site_id}/url-tags
        this.makeGetRequest(`/sites/${params.site_id}/url-tags`, {}));
    }
}
//# sourceMappingURL=list-tags.js.map