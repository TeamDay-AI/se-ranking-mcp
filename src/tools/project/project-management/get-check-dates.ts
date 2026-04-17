import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../base-tool.js';

export class GetCheckDates extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('getCheckDates'),
            {
                title: 'Get Check Dates',
                description: 'Project Tool: List of dates on which positions were actually checked for a project (use getHistoricalDates for the standard comparison dates like yesterday/7days/30days/90days).',
                inputSchema: {
                    site_id: z.number().int().describe('Unique website ID'),
                    site_engine_id: z.number().int().optional().describe('Limit to a single project search engine'),
                    date_from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('Start date (YYYY-MM-DD)'),
                    date_to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().describe('End date (YYYY-MM-DD)'),
                },
                annotations: this.annotations('read'),
            },
            async ({ site_id, ...params }: {
                site_id: number;
                site_engine_id?: number;
                date_from?: string;
                date_to?: string;
            }) => this.makeGetRequest(`/sites/${site_id}/check-dates`, params),
        );
    }
}
