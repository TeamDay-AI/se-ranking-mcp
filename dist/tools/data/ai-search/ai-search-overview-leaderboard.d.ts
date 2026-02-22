import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
/**
 * GetAiOverviewLeaderboard
 * - Calls SE Ranking AI Search "Overview Leaderboard" endpoint: POST /v1/ai-search/overview/leaderboard
 * - Compares a primary target against up to 10 competitors across AI search engines.
 * - Returns brand presence, link presence, share of voice, and rankings.
 */
export declare class GetAiOverviewLeaderboard extends BaseTool {
    registerTool(server: McpServer): void;
}
