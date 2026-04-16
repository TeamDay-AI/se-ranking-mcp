import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

import { ApiType, BaseTool } from '../../base-tool.js';

export class ListProjects extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('listProjects'),
            {
                title: 'List Projects',
                description: 'Project Tool: Get a list of all user projects.',
                inputSchema: {},
                annotations: this.annotations('read'),
            },
            async () => this.makeGetRequest('/sites', {}),
        );
    }
}
