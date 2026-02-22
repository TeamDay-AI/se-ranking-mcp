import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ApiType, BaseTool } from '../../base-tool.js';
export declare class UpdateProject extends BaseTool {
    protected apiType: ApiType;
    registerTool(server: McpServer): void;
    protected makeJsonRequestWithPut(path: string, body: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
}
