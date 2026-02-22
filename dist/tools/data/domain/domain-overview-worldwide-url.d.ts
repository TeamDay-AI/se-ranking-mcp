import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
export declare class GetUrlOverviewWorldwide extends BaseTool {
    readonly FIELDS: string[];
    registerTool(server: McpServer): void;
}
