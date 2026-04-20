import { createRequire } from 'node:module';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { instructions } from './instructions.js';
import { SeoApiMcpServer } from './seo-api-mcp-server.js';
const pkg = createRequire(import.meta.url)('../package.json');
const server = new McpServer({ name: pkg.name, version: pkg.version }, { instructions });
async function runServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('SER Data API MCP Server running on stdio');
}
new SeoApiMcpServer(server).init();
runServer().catch((error) => {
    console.error('Fatal error running server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map