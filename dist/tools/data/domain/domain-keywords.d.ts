import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
export declare class GetDomainKeywords extends BaseTool {
    readonly COLS: string[];
    registerTool(server: McpServer): void;
}
