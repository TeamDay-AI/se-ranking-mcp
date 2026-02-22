import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { DATA_API_BASE, PROJECT_API_BASE, } from '../constants.js';
export var ApiType;
(function (ApiType) {
    ApiType["DATA"] = "DATA";
    ApiType["PROJECT"] = "PROJECT";
})(ApiType || (ApiType = {}));
let tokenProvider = null;
export function setTokenProvider(provider) {
    tokenProvider = provider;
}
export class BaseTool {
    MISSING_TOKEN_MESSAGE = (type) => `Missing ${type === ApiType.DATA ? 'DATA_API_TOKEN' : 'PROJECT_API_TOKEN'}.`;
    /**
     * Defines which API this tool interacts with.
     * Defaults to DATA API for backward compatibility.
     */
    apiType = ApiType.DATA;
    server;
    register(server) {
        this.server = server;
        this.registerTool(server);
    }
    toolName(name) {
        return `${this.apiType}_${name}`;
    }
    log(level, message) {
        if (this.server && typeof this.server.sendLoggingMessage === 'function') {
            this.server
                .sendLoggingMessage({
                level,
                data: message,
            })
                .catch((err) => {
                console.error('Failed to send logging message:', err);
            });
        }
        else {
            console.error(`[${level.toUpperCase()}] ${message}`);
        }
    }
    getToken() {
        if (tokenProvider) {
            return tokenProvider(this.apiType);
        }
        if (this.apiType === ApiType.DATA) {
            return (process.env.DATA_API_TOKEN ||
                process.env.SERANKING_DATA_API_TOKEN ||
                process.env.SERANKING_API_TOKEN ||
                '');
        }
        return process.env.PROJECT_API_TOKEN || process.env.SERANKING_PROJECT_API_TOKEN || '';
    }
    getBaseUrl() {
        return this.apiType === ApiType.DATA ? DATA_API_BASE : PROJECT_API_BASE;
    }
    isValidCommaSeparatedList(list, val) {
        if (!val)
            return true;
        const allowed = new Set(list);
        return val
            .split(',')
            .map((s) => s.trim())
            .every((t) => allowed.has(t));
    }
    /**
     * Transforms underscore-notation filter params back to bracket notation for API calls.
     * E.g., filter_volume_from -> filter[volume][from]
     *       filter_intents -> filter[intents]
     */
    transformFilterParams(params) {
        const transformed = {};
        for (const [key, value] of Object.entries(params)) {
            if (value === undefined || value === null)
                continue;
            let newKey = key;
            // Match filter_X_Y pattern (two-level bracket: filter[X][Y])
            // Handle underscores in the middle part by matching the last underscore as the separator
            const twoLevelMatch = key.match(/^filter_(.+)_(from|to)$/);
            if (twoLevelMatch) {
                newKey = `filter[${twoLevelMatch[1]}][${twoLevelMatch[2]}]`;
            }
            else {
                // Match filter_X pattern (single-level bracket: filter[X])
                const oneLevelMatch = key.match(/^filter_(.+)$/);
                if (oneLevelMatch) {
                    newKey = `filter[${oneLevelMatch[1]}]`;
                }
            }
            transformed[newKey] = value;
        }
        return transformed;
    }
    async request(path, method = 'GET', params = {}) {
        const token = this.getToken();
        if (!token) {
            throw new McpError(ErrorCode.InvalidRequest, this.MISSING_TOKEN_MESSAGE(this.apiType));
        }
        let url = `${this.getBaseUrl()}${path}`;
        const options = {
            method,
            headers: { Authorization: `Token ${token}` },
        };
        if (method === 'GET') {
            const query = this.getUrlSearchParamsFromParams(params);
            url += `?${query.toString()}`;
        }
        else if (method === 'DELETE') {
            const query = this.getUrlSearchParamsFromParams(params);
            url += `?${query.toString()}`;
        }
        else if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
            if (Object.keys(params).length > 0) {
                if (method === 'PATCH' || method === 'PUT') {
                    options.headers = { ...options.headers, 'Content-Type': 'application/json' };
                    options.body = JSON.stringify(params);
                }
            }
        }
        return this.executeRequest(url, options);
    }
    async makeGetRequest(path, params) {
        const query = this.getUrlSearchParamsFromParams(params);
        const url = `${this.getBaseUrl()}${path}?${query.toString()}`;
        return this.executeRequest(url, { method: 'GET' });
    }
    async makePostRequest(path, queryParams, formParams) {
        const query = this.getUrlSearchParamsFromParams(queryParams);
        const url = `${this.getBaseUrl()}${path}?${query.toString()}`;
        const form = this.getFormDataFromParams(formParams);
        return this.executeRequest(url, { method: 'POST', body: form });
    }
    async makePutRequest(path, body) {
        const url = `${this.getBaseUrl()}${path}`;
        return this.executeRequest(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    async makeJsonPostRequest(path, body) {
        const url = `${this.getBaseUrl()}${path}`;
        return this.executeRequest(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    async makePatchRequest(path, queryParams, body) {
        const query = this.getUrlSearchParamsFromParams(queryParams);
        const url = `${this.getBaseUrl()}${path}?${query.toString()}`;
        return this.executeRequest(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
    }
    async makeDeleteRequest(path, params) {
        const query = this.getUrlSearchParamsFromParams(params);
        const url = `${this.getBaseUrl()}${path}?${query.toString()}`;
        return this.executeRequest(url, { method: 'DELETE' });
    }
    async executeRequest(url, init) {
        const token = this.getToken();
        if (!token) {
            throw new McpError(ErrorCode.InvalidRequest, this.MISSING_TOKEN_MESSAGE(this.apiType));
        }
        const headers = new Headers(init.headers);
        headers.set('Authorization', `Token ${token}`);
        init.headers = headers;
        try {
            const res = await fetch(url, init);
            return await this.getJSONResponse(res, url);
        }
        catch (err) {
            // If it's already an McpError, rethrow it
            if (err instanceof McpError)
                throw err;
            throw new McpError(ErrorCode.InternalError, `Request failed: ${err?.message || String(err)}\nURL: ${url}`);
        }
    }
    async getJSONResponse(res, url) {
        const text = await res.text();
        if (!res.ok) {
            throw new McpError(ErrorCode.InternalError, `API error (${res.status} ${res.statusText}). URL: ${url}\nBody: ${text}`);
        }
        let pretty = text;
        try {
            const json = JSON.parse(text);
            pretty = JSON.stringify(json, null, 2);
        }
        catch (err) {
            this.log('warning', `Failed to pretty-print JSON response: ${err?.message || String(err)}. Response text: ${text}`);
            // If it's not JSON, we just return the text as is, or maybe we should fail if we expect JSON?
            // The original code just returned the text if it failed to parse/pretty-print.
        }
        return { content: [{ type: 'text', text: pretty }] };
    }
    getUrlSearchParamsFromParams(queryParams) {
        const query = new URLSearchParams();
        for (const [key, value] of Object.entries(queryParams || {})) {
            if (value === undefined || value === null)
                continue;
            if (Array.isArray(value)) {
                for (const v of value) {
                    if (v !== undefined && v !== null)
                        query.append(key, String(v));
                }
            }
            else {
                query.append(key, String(value));
            }
        }
        return query;
    }
    getFormDataFromParams(formParams) {
        const form = new FormData();
        for (const [key, value] of Object.entries(formParams || {})) {
            if (value === undefined || value === null)
                continue;
            if (Array.isArray(value)) {
                for (const v of value) {
                    if (v !== undefined && v !== null)
                        form.append(key, String(v));
                }
            }
            else {
                form.append(key, String(value));
            }
        }
        return form;
    }
}
//# sourceMappingURL=base-tool.js.map