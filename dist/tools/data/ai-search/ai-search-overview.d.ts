import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
/**
 * AiSearchOverview
 * - Calls SE Ranking AI Search “Overview” endpoint: /v1/ai-search/overview
 * - Uses request parameters exactly as per docs (target, scope, source, engine).
 * - Returns high-level overview metrics and trend time series.
 */
export declare class GetAiOverview extends BaseTool {
    registerTool(server: McpServer): void;
}
