import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class DeletePrompts extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deletePrompts'), {
            title: 'Delete Prompts',
            description: 'Project Tool: Delete prompts (keywords) from a specific LLM engine in AI Result Tracker by their k2site_llm_id.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                llm_id: z.number().int().describe('LLM Engine ID'),
                k2site_llm_ids: z.array(z.number().int()).min(1).describe('Array of k2site_llm_id values to delete'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeJsonDeleteRequest(`/sites/${params.site_id}/airt/llm/${params.llm_id}/prompts`, { k2site_llm_ids: params.k2site_llm_ids }));
    }
}
//# sourceMappingURL=delete-prompts.js.map