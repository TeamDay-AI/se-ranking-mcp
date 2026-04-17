import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { ApiType, BaseTool } from '../../../base-tool.js';

export class UpdateLlmEngine extends BaseTool {
    protected apiType = ApiType.PROJECT;

    registerTool(server: McpServer): void {
        server.registerTool(
            this.toolName('updateLlmEngine'),
            {
                title: 'Update LLM Engine',
                description: 'Project Tool: Partially update configuration of an LLM engine in AI Result Tracker (region_name and/or lang_code). `region_name` is only honored for location-aware engines (google_ai_overview, google_ai_mode, gemini); chatgpt/perplexity silently ignore it and return `region_name: null`.',
                inputSchema: {
                    site_id: z.number().int().describe('Site ID'),
                    id: z.number().int().describe('LLM Engine ID'),
                    region_name: z
                        .string()
                        .nullable()
                        .optional()
                        .describe(
                            'Canonical SERP location name (e.g. "Los Angeles, California, United States"). Must match exactly a value returned by DATA_getSerpLocations — abbreviated forms like "Los Angeles, CA, USA" are rejected with HTTP 400 "Invalid region name". Set to null to clear.',
                        ),
                    lang_code: z.string().nullable().optional().describe('Language code (e.g. "es"). Set to null to clear.'),
                },
                annotations: this.annotations('writeIdempotent'),
            },
            async (params: {
                site_id: number;
                id: number;
                region_name?: string | null;
                lang_code?: string | null;
            }) => {
                const { site_id, id, ...body } = params;
                return this.makePatchRequest(`/sites/${site_id}/airt/llm/${id}`, {}, body);
            },
        );
    }
}
