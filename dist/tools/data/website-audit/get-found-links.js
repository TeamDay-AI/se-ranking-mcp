import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class GetFoundLinks extends BaseTool {
    registerTool(server) {
        server.registerTool(this.toolName('getFoundLinks'), {
            title: 'Get Found Links',
            description: 'Data Tool: Returns a paginated list of every hyperlink discovered across the entire site during the audit.',
            inputSchema: {
                audit_id: z.number().int().describe('Unique identifier of the audit.'),
                page_type: z
                    .enum(['internal', 'external', 'all'])
                    .optional()
                    .default('all')
                    .describe('Filters links by type.'),
                limit: z.number().int().optional().describe('Number of links to return in the list.'),
                offset: z.number().int().optional().describe('Starting position for the list of links.'),
                filter: z
                    .array(z.object({
                    param: z.string().describe('The field you want to filter on (e.g., status).'),
                    value: z.union([z.string(), z.number()]).describe('The value to match.'),
                    type: z
                        .enum(['and', 'or'])
                        .optional()
                        .describe('The logical operator to connect this condition to the previous one.'),
                }))
                    .optional()
                    .describe('Array of filter objects to build complex queries.'),
            },
        }, async (params) => {
            const { filter, ...rest } = params;
            const queryParams = { ...rest };
            if (filter) {
                filter.forEach((f, index) => {
                    queryParams[`filter[${index}][param]`] = f.param;
                    queryParams[`filter[${index}][value]`] = f.value;
                    if (f.type) {
                        queryParams[`filter[${index}][type]`] = f.type;
                    }
                });
            }
            return this.makeGetRequest('/v1/site-audit/audits/links', queryParams);
        });
    }
}
//# sourceMappingURL=get-found-links.js.map