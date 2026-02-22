import { ApiType, BaseTool } from '../../base-tool.js';
export class GetAccountBalance extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getAccountBalance'), {
            title: 'Get Account Balance',
            description: 'Project Tool: Get the current account balance including currency and currency code.',
            inputSchema: {},
        }, async () => this.makeGetRequest('/account/balance', {}));
    }
}
//# sourceMappingURL=get-account-balance.js.map