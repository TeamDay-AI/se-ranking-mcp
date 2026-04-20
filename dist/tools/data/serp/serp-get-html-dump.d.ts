import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
/**
 * GetSerpHtmlDump
 * - Calls SE Ranking SERP "Get HTML dump" endpoint: /v1/serp/classic/tasks/html
 * - Returns a ZIP file containing the raw HTML of the SERP results page.
 * - Useful for debugging or archiving the actual SERP page content.
 */
export declare class GetSerpHtmlDump extends BaseTool {
    registerTool(server: McpServer): void;
}
