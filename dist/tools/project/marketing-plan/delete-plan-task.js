import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class DeletePlanTask extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('deletePlanTask'), {
            title: 'Delete Marketing Plan Task',
            description: 'Project Tool: Delete a task from the marketing plan. Only tasks created via the API can be deleted.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                task_id: z.string().describe('Task ID to delete'),
            },
        }, async (params) => this.makeDeleteRequest(`/checklist/${params.site_id}/task/${params.task_id}`, {}));
    }
}
//# sourceMappingURL=delete-plan-task.js.map