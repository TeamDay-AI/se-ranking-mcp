import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class DeleteLlmEngine extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deleteLlmEngine'), {
            title: 'Delete LLM Engine',
            description: 'Project Tool: Remove an LLM engine from a site in AI Result Tracker.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                id: z.number().int().describe('LLM Engine ID'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest(`/sites/${params.site_id}/airt/llm/${params.id}`, {}));
    }
}
//# sourceMappingURL=delete-llm-engine.js.map