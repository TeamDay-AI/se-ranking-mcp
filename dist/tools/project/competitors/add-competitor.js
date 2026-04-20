import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class AddCompetitor extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('addCompetitor'), {
            title: 'Add Competitor',
            description: 'Project Tool: Requires a project ID (site_id). Add a competitor website to a project for position tracking.',
            inputSchema: {
                site_id: z.number().describe('Unique project ID'),
                url: z.string().describe('Competitor website URL'),
                name: z.string().optional().describe('Competitor website name (if not specified, the URL will be used)'),
                subdomain_match: z.number().int().min(0).max(1).optional().describe('Take subdomains into account (1 – yes , 0 – no)'),
            },
            annotations: this.annotations('write'),
        }, async (args) => {
            const { site_id, ...params } = args;
            return this.makeJsonPostRequest('/competitors', {
                site_id,
                ...params,
            });
        });
    }
}
//# sourceMappingURL=add-competitor.js.map