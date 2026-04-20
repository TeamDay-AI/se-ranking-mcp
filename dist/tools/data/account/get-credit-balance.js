import { BaseTool } from '../../base-tool.js';
export class GetCreditBalance extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getCreditBalance'), {
            title: 'Get Credit Balance',
            description: 'Data Tool: Get the current account credit balance including total limit and used credits.',
            inputSchema: {},
            annotations: this.annotations('read'),
        }, async () => this.makeGetRequest('/v1/account/credit-balance', {}));
    }
}
//# sourceMappingURL=get-credit-balance.js.map