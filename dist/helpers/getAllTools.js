import { McpServerMock } from '../classes/McpServerMock.js';
import { SeoApiMcpServer } from '../seo-api-mcp-server.js';
export const getAllTools = () => {
    const server = new McpServerMock();
    new SeoApiMcpServer(server).init();
    return server.tools;
};
//# sourceMappingURL=getAllTools.js.map