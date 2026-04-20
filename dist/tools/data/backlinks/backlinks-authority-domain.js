import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class GetDomainAuthority extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getDomainAuthority'), {
            title: 'Get Domain Authority',
            description: 'Data Tool: Returns information about the domain InLink Rank (Domain Authority) of the target page’s root domain.',
            inputSchema: {
                target: z.string().describe('Aim of the request: root domain, host, or URL.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest('/v1/backlinks/authority/domain', params));
    }
}
//# sourceMappingURL=backlinks-authority-domain.js.map