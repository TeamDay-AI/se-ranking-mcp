import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ApiType, BaseTool } from '../../base-tool.js';
export declare class CreateKeywordGroup extends BaseTool {
    protected apiType: ApiType;
    registerTool(server: McpServer): void;
}
