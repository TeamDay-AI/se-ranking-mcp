import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
export declare class GetSerpResults extends BaseTool {
    registerTool(server: McpServer): void;
    private addSerpTask;
    private getSerpTaskStatus;
    private getSerpTaskAdvancedResults;
    private sleep;
}
