import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeleteCompetitor extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteCompetitor'), {
            title: 'Delete Competitor',
            description: 'Project Tool: Requires a competitor ID. Remove a competitor website from a user project.',
            inputSchema: {
                competitor_id: z.number().describe('Incorrect competitor id'),
            },
            annotations: this.annotations('destructive'),
        }, async (args) => this.makeDeleteRequest(`/competitors/${args.competitor_id}`, {}));
    }
}
//# sourceMappingURL=delete-competitor.js.map