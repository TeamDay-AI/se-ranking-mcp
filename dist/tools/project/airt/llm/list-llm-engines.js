import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class ListLlmEngines extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('listLlmEngines'), {
            title: 'List LLM Engines',
            description: 'Project Tool: Get all LLM engines configured for a site in AI Result Tracker.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/sites/${params.site_id}/airt/llm`, {}));
    }
}
//# sourceMappingURL=list-llm-engines.js.map