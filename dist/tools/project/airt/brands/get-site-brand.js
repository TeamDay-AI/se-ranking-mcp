import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class GetSiteBrand extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getSiteBrand'), {
            title: 'Get Site Brand',
            description: 'Project Tool: Retrieve the brand configured for a site in AI Result Tracker.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/sites/${params.site_id}/airt/brands`, {}));
    }
}
//# sourceMappingURL=get-site-brand.js.map