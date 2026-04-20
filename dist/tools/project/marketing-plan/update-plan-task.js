import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class UpdatePlanTask extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('updatePlanTask'), {
            title: 'Update Marketing Plan Task',
            description: 'Project Tool: Update an existing marketing plan task title and description.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                task_id: z.string().describe('Task ID to update'),
                title: z.string().describe('New task title/name'),
                text: z.string().describe('New task description'),
            },
            annotations: this.annotations('writeIdempotent'),
        }, async (params) => {
            const { site_id, ...body } = params;
            return this.makePutRequest(`/checklist/${site_id}/task/`, body);
        });
    }
}
//# sourceMappingURL=update-plan-task.js.map