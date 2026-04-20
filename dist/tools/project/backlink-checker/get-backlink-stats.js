import { z } from 'zod';
import { ApiType, BaseTool } from '../../base-tool.js';
export class GetBacklinkStats extends BaseTool {
    apiType = ApiType.PROJECT;
    registerTool(server) {
        server.registerTool(this.toolName('getBacklinkStats'), {
            title: 'Get Backlink Statistics',
            description: 'Project Tool: Get backlink statistics for a website including total count, anchors, IPs, domains, dofollow/nofollow counts.',
            inputSchema: {
                site_id: z.number().int().describe('Unique website ID'),
            },
            annotations: this.annotations('read'),
        }, async (params) => this.makeGetRequest(`/backlinks/${params.site_id}/stat`, {}));
    }
}
//# sourceMappingURL=get-backlink-stats.js.map