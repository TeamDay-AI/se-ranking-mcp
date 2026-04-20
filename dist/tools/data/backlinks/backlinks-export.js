import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class ExportBacklinksData extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('exportBacklinksData'), {
            title: 'Export Backlinks Data',
            description: 'Data Tool: Retrieves large-scale backlinks asynchronously, returning a task ID to check status later.',
            inputSchema: {
                target: z.string().describe('Aim of the request: root domain, host, or URL.'),
                mode: z.enum(['domain', 'host', 'url']).optional().default('host'),
                output: z.enum(['json', 'xml']).optional().describe('Output format for the export.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest('/v1/backlinks/export', params));
    }
}
//# sourceMappingURL=backlinks-export.js.map