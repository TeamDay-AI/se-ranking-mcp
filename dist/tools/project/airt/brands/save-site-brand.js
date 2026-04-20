import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class SaveSiteBrand extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('saveSiteBrand'), {
            title: 'Save Site Brand',
            description: 'Project Tool: Configure brand for a site in AI Result Tracker. Overwrites existing brand. Brand is shared across all AI search engines.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                brand: z.string().min(1).max(255).describe('Brand name to save (non-empty, max 255 characters)'),
            },
            annotations: this.annotations('writeIdempotent'),
        }, async (params) => this.makeJsonPostRequest(`/sites/${params.site_id}/airt/brands`, { brand: params.brand }));
    }
}
//# sourceMappingURL=save-site-brand.js.map