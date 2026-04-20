import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class DeletePromptGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deletePromptGroup'), {
            title: 'Delete Prompt Group',
            description: 'Project Tool: Delete an AI Result Tracker prompt group. Prompts in the group are moved to the default group. The default group cannot be deleted.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                group_id: z.number().int().describe('Prompt group ID'),
            },
            annotations: this.annotations('destructive'),
        }, async (params) => this.makeDeleteRequest(`/sites/${params.site_id}/airt/prompt-groups/${params.group_id}`, {}));
    }
}
//# sourceMappingURL=delete-prompt-group.js.map