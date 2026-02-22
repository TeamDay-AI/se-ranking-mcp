import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
export declare class ExportKeywords extends BaseTool {
    readonly COLS: string[];
    registerTool(server: McpServer): void;
}
