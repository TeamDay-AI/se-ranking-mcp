import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
export declare class SeoApiMcpServer {
    private readonly server;
    constructor(server: McpServer);
    private dataTools;
    private projectTools;
    init(): void;
}
