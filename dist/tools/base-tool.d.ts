import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { type ToolAnnotations } from '@modelcontextprotocol/sdk/types.js';
export declare enum ApiType {
    DATA = "DATA",
    PROJECT = "PROJECT"
}
export type ToolKind = 'read' | 'write' | 'writeIdempotent' | 'destructive';
type TokenProvider = (apiType: ApiType) => string | undefined;
export declare function setTokenProvider(provider: TokenProvider | null): void;
export declare abstract class BaseTool {
    private readonly MISSING_TOKEN_MESSAGE;
    abstract registerTool(server: McpServer): void;
    /**
     * Defines which API this tool interacts with.
     * Defaults to DATA API for backward compatibility.
     */
    protected apiType: ApiType;
    protected server?: McpServer;
    register(server: McpServer): void;
    protected toolName(name: string): string;
    protected annotations(kind: ToolKind): ToolAnnotations;
    protected log(level: 'debug' | 'info' | 'notice' | 'warning' | 'error' | 'critical' | 'alert' | 'emergency', message: string): void;
    protected getToken(): string | undefined;
    protected getBaseUrl(): string;
    protected isValidCommaSeparatedList(list: readonly string[], val?: string | null): boolean;
    /**
     * Transforms underscore-notation filter params back to bracket notation for API calls.
     * E.g., filter_volume_from -> filter[volume][from]
     *       filter_intents -> filter[intents]
     */
    protected transformFilterParams(params: Record<string, unknown>): Record<string, unknown>;
    protected request(path: string, method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE', params?: Record<string, unknown>): Promise<{
        content: {
            type: 'text';
            text: string;
        }[];
    }>;
    protected makeGetRequest(path: string, params: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makeBinaryGetRequest(path: string, params: Record<string, unknown>, mimeType?: string): Promise<{
        content: {
            type: "resource";
            resource: {
                uri: string;
                mimeType: string;
                blob: string;
            };
        }[];
    }>;
    private executeBinaryRequest;
    protected makePostRequest(path: string, queryParams: Record<string, unknown>, formParams: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makePutRequest(path: string, body: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makeJsonPostRequest(path: string, body: Record<string, unknown> | unknown[]): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makeBodylessPostRequest(path: string): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makePatchRequest(path: string, queryParams: Record<string, unknown>, body: Record<string, unknown> | unknown[]): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makeDeleteRequest(path: string, params: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    protected makeJsonDeleteRequest(path: string, body: Record<string, unknown> | unknown[]): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
        structuredContent?: Record<string, unknown>;
    }>;
    private executeRequest;
    private getJSONResponse;
    private getUrlSearchParamsFromParams;
    private getFormDataFromParams;
}
export {};
