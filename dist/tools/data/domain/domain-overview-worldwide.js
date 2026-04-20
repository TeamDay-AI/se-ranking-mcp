import { z } from 'zod';
import { BaseTool } from '../../base-tool.js';
export class GetDomainOverviewWorldwide extends BaseTool {
    FIELDS = ['price', 'traffic', 'keywords', 'positions_diff', 'positions_tops'];
    registerTool(server) {
        server.registerTool(this.toolName('getDomainOverviewWorldwide'), {
            title: 'Domain Overview Worldwide',
            description: 'Data Tool: Retrieves an aggregated worldwide overview of domain metrics.',
            inputSchema: {
                domain: z
                    .string()
                    .min(1, 'domain is required')
                    .describe('The domain name for which to retrieve worldwide statistics.'),
                currency: z
                    .string()
                    .max(3)
                    .optional()
                    .default('USD')
                    .describe('An ISO 4217 currency code to be used for any monetary values (like traffic cost) returned in the response.'),
                fields: z
                    .string()
                    .optional()
                    .refine((val) => this.isValidCommaSeparatedList(this.FIELDS, val), {
                    message: 'fields must be a comma-separated list of supported fields',
                })
                    .default('price, traffic, keywords')
                    .describe('A comma-separated list specifying which data fields or categories to include in the response. This allows for tailoring the response to only the needed information.'),
                with_subdomains: z
                    .boolean()
                    .optional()
                    .describe('Whether to include subdomain data in the results.'),
                show_zones_list: z
                    .number()
                    .int()
                    .min(0)
                    .max(1)
                    .optional()
                    .default(0)
                    .describe('A boolean-like value (“1” for true, “0” for false) to determine if the response should include a detailed breakdown of statistics for each individual regional zone (country) in addition to the aggregated worldwide statistics.'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest('/v1/domain/overview/worldwide', params));
    }
}
//# sourceMappingURL=domain-overview-worldwide.js.map