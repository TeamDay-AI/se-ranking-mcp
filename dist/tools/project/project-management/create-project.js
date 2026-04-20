import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class CreateProject extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('createProject'), {
            title: 'Create Project',
            description: 'Project Tool: Requires a project ID. Add a new project to the user account.',
            inputSchema: {
                url: z.string().describe('Website URL'),
                title: z.string().describe('Project name'),
                depth: z.enum(['100', '200']).optional().describe('Ranking position collection depth (100, 200), 100 by default'),
                subdomain_match: z.enum(['0', '1']).optional().describe('Take subdomains in SERPs into account? (0 or 1), 0 by default'),
                exact_url: z.enum(['0', '1']).optional().describe('Exact URL? (0 or 1), 0 by default'),
                check_freq: z
                    .enum(['check_daily', 'check_1in3', 'check_weekly', 'check_monthly', 'manual'])
                    .optional()
                    .describe("Position check frequency ('check_daily','check_1in3','check_weekly', 'check_monthly', 'manual'), check_daily set by default"),
                auto_reports: z.enum(['0', '1']).optional().describe('Weekly report? (0 or 1), 1 by default'),
                disable_audit: z.enum(['0', '1']).optional().describe('0 by default, 1 if you want to skip website audit'),
                site_group_id: z.number().int().optional().describe('ID of the group where a new project will be added'),
                check_day: z.number().int().optional().describe('Day of week (1-7) for weekly checks, or day of month (1-31) for monthly checks'),
                is_active: z.enum(['0', '1']).optional().describe('Project status 1 – active, 0 – delayed'),
            },
            annotations: this.annotations('write'),
        }, async (params) => 
        // The API expects an array of project objects, even for a single project creation according to example: [{"url":..., "title":...}]
        // However, standard REST usually takes an object. Let's check the docs again.
        // Docs: POST https://api4.seranking.com/sites
        // Request body: [{"url": "http://test.site/","title": "seo site"}]
        // It's an array.
        // We wrap the params in an array.
        this.makeJsonPostRequest('/sites', params));
    }
}
//# sourceMappingURL=create-project.js.map