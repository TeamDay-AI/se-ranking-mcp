import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
import { auditSettingsSchema } from './schemas/audit-settings.js';
export class ProjectCreateAudit extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('createAudit'), {
            title: 'Create Audit',
            description: 'Project Tool: Launches a website audit that crawls the HTML of a website. Be aware of the page crawl limit included in your plan.',
            inputSchema: {
                domain: z.string().describe('The domain to be audited (e.g., domain.com).'),
                title: z
                    .string()
                    .max(300)
                    .optional()
                    .describe('Custom title for the audit report. Max 300 characters. Defaults to the domain.'),
                settings: auditSettingsSchema
                    .optional()
                    .describe('Object containing specific audit settings. Only include parameters you want to override.'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeJsonPostRequest('/audit/create', params));
    }
}
//# sourceMappingURL=create-audit.js.map