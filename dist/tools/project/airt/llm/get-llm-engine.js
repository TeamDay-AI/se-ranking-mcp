import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class GetLlmEngine extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getLlmEngine'), {
            title: 'Get LLM Engine',
            description: 'Project Tool: Get details of a specific LLM engine in AI Result Tracker.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                id: z.number().int().describe('LLM Engine ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/sites/${params.site_id}/airt/llm/${params.id}`, {}));
    }
}
//# sourceMappingURL=get-llm-engine.js.map