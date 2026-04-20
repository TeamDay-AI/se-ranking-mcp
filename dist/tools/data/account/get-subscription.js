import { BaseTool } from '../../base-tool.js';
export class GetSubscription extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getSubscription'), {
            title: 'Get Subscription Data',
            description: 'Data Tool: Get information about the current subscription including status, dates, and unit limits.',
            inputSchema: {},
            annotations: this.annotations('read'),
        }, async () => this.makeGetRequest('/v1/account/subscription', {}));
    }
}
//# sourceMappingURL=get-subscription.js.map