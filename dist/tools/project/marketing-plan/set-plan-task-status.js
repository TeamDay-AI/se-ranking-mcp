import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class SetPlanTaskStatus extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('setPlanTaskStatus'), {
            title: 'Set Marketing Plan Task Status',
            description: 'Project Tool: Set the completion status of a marketing plan task.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
                task_id: z.string().describe('Task ID to update'),
                checked: z.boolean().describe('Task completion status (true = completed)'),
            },
        }, async (params) => {
            const { site_id, ...body } = params;
            return this.makePutRequest(`/checklist/${site_id}/task/`, body);
        });
    }
}
//# sourceMappingURL=set-plan-task-status.js.map