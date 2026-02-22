import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { BaseTool } from '../../base-tool.js';
/**
 * AiSearchDiscoverBrand
 * - Calls SE Ranking AI Search "Discover Brand" endpoint: /v1/ai-search/discover-brand
 * - Identifies and returns the brand name associated with a given target domain, subdomain, or URL.
 */
export declare class GetAiDiscoverBrand extends BaseTool {
    registerTool(server: McpServer): void;
}
