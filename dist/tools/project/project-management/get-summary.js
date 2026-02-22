import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetSummary extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getSummary'), {
            title: 'Get Summary',
            description: "Project Tool: Requires a project ID. Get a project's summary statistics.",
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
        }, async ({ site_id }) => this.makeGetRequest(`/sites/${site_id}/stat`, {}));
    }
}
//# sourceMappingURL=get-summary.js.map