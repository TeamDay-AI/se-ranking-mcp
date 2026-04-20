import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class GetLlmStatus extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getLlmStatus'), {
            title: 'Get LLM Status',
            description: 'Project Tool: Get tracking status for an LLM engine in AI Result Tracker, including progress and check statistics.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                id: z.number().int().describe('LLM Engine ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/sites/${params.site_id}/airt/llm/${params.id}/status`, {}));
    }
}
//# sourceMappingURL=get-llm-status.js.map