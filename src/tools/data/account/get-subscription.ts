import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { BaseTool } from '../../base-tool.js';

export class GetSubscription extends BaseTool {
    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('getSubscription'),
            {
                title: 'Get Subscription Data',
                description: 'Data Tool: Get information about the current subscription including status, dates, and unit limits.',
                inputSchema: {},
            },
            async () => this.makeGetRequest('/v1/account/subscription', {}),
        );
    }
}
