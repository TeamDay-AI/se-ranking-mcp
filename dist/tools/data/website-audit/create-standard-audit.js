import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
import { dataAuditSettingsSchema } from './schemas/audit-settings.js';
export class CreateStandardAudit extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('createStandardAudit'), {
            title: 'Create Standard Audit',
            description: 'Data Tool: Launches a standard website audit that crawls the HTML of a website. Suitable for most static and server-side rendered sites. For JavaScript-rendered sites (SPAs), use createAdvancedAudit instead.',
            inputSchema: {
                domain: z.string().describe('Domain to be audited (e.g., domain.com).'),
                title: z
                    .string()
                    .max(300)
                    .optional()
                    .describe('Custom title for the audit report. Maximum 300 characters.'),
                settings: dataAuditSettingsSchema
                    .optional()
                    .describe('Object containing specific audit settings. Only include parameters you want to override.'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeJsonPostRequest('/v1/site-audit/audits/standard', params));
    }
}
//# sourceMappingURL=create-standard-audit.js.map