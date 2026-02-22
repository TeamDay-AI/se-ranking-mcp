import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ListCompetitors extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listCompetitors'), {
            title: 'List Competitors',
            description: 'Project Tool: Requires a project ID (site_id). Get a list of all competitors added to the project together with statistics.',
            inputSchema: {
                site_id: z.number().describe('Unique project ID'),
            },
        }, async (args) => this.makeGetRequest(`/competitors/site/${args.site_id}`, {}));
    }
}
//# sourceMappingURL=list-competitors.js.map