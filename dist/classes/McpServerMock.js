export class McpServerMock {
    tools = [];
    prompts = [];
    logs = [];
    registerTool(name, def, handler) {
        this.tools.push({
            inputSchema: {},
            name,
            def,
            handler,
        });
    }
    prompt(name, def, handler) {
        this.prompts.push({
            name,
            def,
            handler,
        });
    }
    sendLoggingMessage(log) {
        this.logs.push(log);
    }
}
//# sourceMappingURL=McpServerMock.js.map