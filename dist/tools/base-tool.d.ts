import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
export declare enum ApiType {
    DATA = "DATA",
    PROJECT = "PROJECT"
}
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
    }>;
    protected makePostRequest(path: string, queryParams: Record<string, unknown>, formParams: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    protected makePutRequest(path: string, body: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    protected makeJsonPostRequest(path: string, body: Record<string, unknown> | unknown[]): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    protected makePatchRequest(path: string, queryParams: Record<string, unknown>, body: Record<string, unknown> | unknown[]): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    protected makeDeleteRequest(path: string, params: Record<string, unknown>): Promise<{
        content: {
            type: "text";
            text: string;
        }[];
    }>;
    private executeRequest;
    private getJSONResponse;
    private getUrlSearchParamsFromParams;
    private getFormDataFromParams;
}
export {};
