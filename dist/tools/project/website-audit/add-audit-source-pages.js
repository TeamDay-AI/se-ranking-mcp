import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class ProjectAddAuditSourcePages extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('addAuditSourcePages'), {
            title: 'Add Audit Source Pages',
            description: 'Project Tool: Uploads a custom list of pages to crawl for an audit. Submitted as a multipart text file (one URL per line). Automatically sets settings.source_file to 1 so the audit will actually use the list on the next run.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
                urls: z
                    .array(z.string())
                    .min(1)
                    .describe('URLs to include in the list. Each URL becomes one line in the uploaded file.'),
                name: z
                    .string()
                    .optional()
                    .describe('Filename for the uploaded list (e.g. "priority-pages.txt"). Defaults to "urls.txt".'),
            },
            annotations: this.annotations('write'),
        }, async (params) => {
            const filename = params.name ?? 'urls.txt';
            const content = params.urls.join('\n');
            const file = new File([content], filename, { type: 'text/plain' });
            return this.makePostRequest(`/audit/${params.audit_id}/source-pages`, {}, { file });
        });
    }
}
//# sourceMappingURL=add-audit-source-pages.js.map