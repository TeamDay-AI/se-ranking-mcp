import { z } from 'zod';
import { ApiType, BaseTool } from '../../../base-tool.js';
export class CreatePromptGroup extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('createPromptGroup'), {
            title: 'Create Prompt Group',
            description: 'Project Tool: Create a new AI Result Tracker prompt group for a site. Returns 400 if a group with the same name already exists.',
            inputSchema: {
                site_id: z.number().int().describe('Site ID'),
                name: z.string().min(1).max(255).describe('Group name (non-empty, max 255 characters)'),
            },
            annotations: this.annotations('write'),
        }, async (params) => this.makeJsonPostRequest(`/sites/${params.site_id}/airt/prompt-groups`, { name: params.name }));
    }
}
//# sourceMappingURL=create-prompt-group.js.map