// used to mock the tool's inputSchema for testing purposes
export default function captureSchema(tool) {
    let captured = null;
    const mockServer = {
        registerTool: (_name, def) => {
            captured = def?.inputSchema;
        },
    };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    tool.registerTool(mockServer);
    return captured;
}
//# sourceMappingURL=captureSchema.js.map