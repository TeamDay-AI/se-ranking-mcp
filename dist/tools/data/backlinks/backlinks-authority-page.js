import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class GetPageAuthority extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getPageAuthority'), {
            title: 'Get Page Authority',
            description: 'Data Tool: Returns information about the InLink Rank (Page Authority) for a target URL.',
            inputSchema: {
                target: z.string().describe('Aim of the request: root domain, host, or URL.'),
            },
        }, async (params) => this.makeGetRequest('/v1/backlinks/authority/page', params));
    }
}
//# sourceMappingURL=backlinks-authority-page.js.map