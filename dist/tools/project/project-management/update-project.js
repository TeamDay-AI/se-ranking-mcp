import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class UpdateProject extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('updateProject'), {
            title: 'Update Project',
            description: 'Project Tool: Requires a project ID. Change/update project settings.',
            inputSchema: {
                site_id: z.number().int().describe('Unique site ID'),
                title: z.string().optional().describe('Project name'),
                url: z.string().optional().describe('Website URL'), // Docs say url is updatable? "url Website URL" in params list.
                depth: z.enum(['100', '200']).optional().describe('Ranking position collection depth'),
                subdomain_match: z.enum(['0', '1']).optional().describe('Take subdomains in SERPs into account'),
                exact_url: z.enum(['0', '1']).optional().describe('Exact URL?'),
                check_freq: z
                    .enum(['check_daily', 'check_1in3', 'check_weekly', 'check_monthly', 'manual'])
                    .optional(),
                site_group_id: z.number().int().optional().describe('ID of the group'),
                check_day: z.number().int().optional().describe('Day of week (1-7) or day of month (1-31)'),
                is_active: z.enum(['0', '1']).optional().describe('Project status 1 – active, 0 – delayed'),
            },
        }, async ({ site_id, ...params }) => 
        // PUT https://api4.seranking.com/sites/{site_id}
        // Body: {"title":"new site title"}
        this.makeJsonRequestWithPut(`/sites/${site_id}`, params));
    }
    async makeJsonRequestWithPut(path, body) {
        return this.request(path, 'PUT', body);
    }
}
//# sourceMappingURL=update-project.js.map