import { ApiType, BaseTool } from '../../base-tool.js';
export class GetSubscription extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getSubscription'), {
            title: 'Get Subscription Data',
            description: 'Project Tool: Get information about the current user subscription including type, balance, and expiration status.',
            inputSchema: {},
        }, async () => this.makeGetRequest('/account/subscription', {}));
    }
}
//# sourceMappingURL=get-subscription.js.map