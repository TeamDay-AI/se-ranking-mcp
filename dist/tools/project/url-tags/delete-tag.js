import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteTag extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteTag'), {
            title: 'Delete Tag',
            description: 'Project Tool: Requires a project ID. Delete a tag.',
            inputSchema: {
                site_id: z.number().int().describe('Website ID'),
                tag_id: z.number().int().describe('Tag ID'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => 
        // DELETE /sites/{site_id}/url-tags/{tag_id}
        this.makeDeleteRequest(`/sites/${params.site_id}/url-tags/${params.tag_id}`, {}));
    }
}
//# sourceMappingURL=delete-tag.js.map