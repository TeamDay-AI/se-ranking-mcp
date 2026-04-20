import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class MoveProjectsToGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('moveProjectsToGroup'), {
            title: 'Move Projects to Group',
            description: 'Project Tool: Requires a project ID. Transfer projects from one project group to another (or to a specific group).',
            inputSchema: {
                group_id: z.number().int().describe('ID of the destination project group'),
                site_ids: z.array(z.number().int()).describe('Array of website IDs to transfer'),
            },
            annotations: this.annotations('write'),
        }, async ({ group_id, site_ids }) => 
        // POST https://api4.seranking.com/site-groups/{group_id}/sites
        // Body: {"site_ids" : [1,2,3...]}
        this.makeJsonPostRequest(`/site-groups/${group_id}/sites`, { site_ids }));
    }
}
//# sourceMappingURL=move-projects-to-group.js.map