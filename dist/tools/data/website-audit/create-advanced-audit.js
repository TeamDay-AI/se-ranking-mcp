import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
import { dataAuditSettingsSchema } from './schemas/audit-settings.js';
export class CreateAdvancedAudit extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('createAdvancedAudit'), {
            title: 'Create Advanced Audit',
            description: 'Data Tool: Launches an advanced website audit that renders JavaScript before analyzing the page. Suitable for Single-Page Applications (SPAs) or dynamic content. For static or server-side-rendered sites, prefer createStandardAudit (cheaper, faster).',
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
        }, async (params) => this.makeJsonPostRequest('/v1/site-audit/audits/advanced', params));
    }
}
//# sourceMappingURL=create-advanced-audit.js.map