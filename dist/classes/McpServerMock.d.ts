import { MockServerTools } from '../types/MockServerTools.js';
export declare class McpServerMock {
    tools: Array<MockServerTools>;
    prompts: Array<any>;
    logs: Array<any>;
    registerTool(name: string, def: any, handler: any): void;
    prompt(name: string, def: any, handler: any): void;
    sendLoggingMessage(log: any): void;
}
