import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class AddDisavowedBacklinks extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('addDisavowedBacklinks'), {
            title: 'Add Disavowed Backlinks',
            description: 'Project Tool: Add a list of URLs to the disavowed backlinks list.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                list: z.array(z.string().url()).describe('Array of backlink URLs to disavow'),
            },
            annotations: this.annotations('write'),
        }, async (params) => {
            const { site_id, list } = params;
            return this.makeJsonPostRequest(`/backlink-disavow/${site_id}`, { list });
        });
    }
}
//# sourceMappingURL=add-disavowed-backlinks.js.map