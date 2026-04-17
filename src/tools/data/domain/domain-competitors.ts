import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { BaseTool } from '../../base-tool.js';

export class GetDomainCompetitors extends BaseTool {
  registerTool(server: McpServer): void {
    server.registerTool(
      this.toolName('getDomainCompetitors'),
      {
        title: 'Domain Competitors',
        description:
          'Data Tool: Retrieves up to 500 competing domains (organic or paid) for a target domain, pre-sorted by shared keyword count (descending). Each row includes common_keywords, domain_relevance, total_keywords, missing_keywords, traffic_sum, price_sum. Upstream API does not support limit, offset, or custom sort — response size is fixed (~60KB for popular domains).',
        inputSchema: {
          source: z
            .string()
            .min(1, 'source is required')
            .max(2)
            .describe('Alpha-2 country code of the regional keyword database.'),
          domain: z
            .string()
            .min(1, 'domain is required')
            .describe('The primary domain for which to find competitors.'),
          type: z
            .enum(['organic', 'adv'])
            .optional()
            .default('organic')
            .describe(
              'Whether to return organic or paid-search (advertising) competitors.',
            ),
        },
        annotations: this.annotations('read'),
      },
      async (params) => this.makeGetRequest('/v1/domain/competitors', params),
    );
  }
}
