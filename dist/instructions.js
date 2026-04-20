export const instructions = `This server exposes SE Ranking's SEO APIs as MCP tools. It covers two products with distinct tool namespaces:

- DATA_*  — SEO analytics on any domain (no prior setup). Covers backlinks, domain/competitor analysis, keyword research, SERP tasks, website audits, AI-search visibility, and account/credit info.
- PROJECT_* — Operations on projects the user owns in their SE Ranking account. Covers rank tracking, keyword/competitor/backlink management inside projects, marketing plans, sub-accounts, and AIRT (AI Result Tracker) prompts.

Authentication — two separate tokens, NOT interchangeable
- Data tools require DATA_API_TOKEN (fallbacks: SERANKING_DATA_API_TOKEN, SERANKING_API_TOKEN).
- Project tools require PROJECT_API_TOKEN (fallback: SERANKING_PROJECT_API_TOKEN). A Data token does not authenticate Project calls.
- SE Ranking's Docker quickstart sets only SERANKING_API_TOKEN — that covers Data tools only. To use any PROJECT_* tool, PROJECT_API_TOKEN must be set explicitly.
- If a tool fails with "Missing ... token", set the env var named in the error.

Rate limits (enforce client-side pacing)
- Data API: 10 requests/second.
- Project API: 5 requests/second.
Prefer sequential calls or small-batch parallelism (≤3 concurrent per API) over large fan-outs. For multi-domain or multi-keyword workloads, iterate rather than parallelize aggressively.

Resolving IDs and lookup values before calling other tools
- SERP locations and country codes → DATA_getSerpLocations.
- Available search engines for projects → PROJECT_getAvailableSearchEngines, with languages from PROJECT_getGoogleLanguages.
- Keyword-volume regions → PROJECT_getVolumeRegions.
- Project IDs → PROJECT_listProjects (or PROJECT_listOwnedProjects / PROJECT_listSharedProjects for sub-account setups).
- Audit IDs → DATA_listAudits or PROJECT_listAudits depending on which API created it.
- Keyword group / tag / backlink group / prompt group IDs → the corresponding PROJECT_list* tool.
Call the appropriate list tool first when an ID is needed and not supplied by the user.

Destructive operations
Tools annotated with destructiveHint (delete, remove, disavow) permanently modify account state. Confirm intent with the user before invoking them. Idempotent writes (update/rename/set) are safer but still change state — surface what will change before calling.

Response shape
Tools return both a text block (pretty-printed JSON) and structuredContent (the parsed object) when the upstream response is JSON. Top-level JSON arrays are wrapped as { data: [...] } in structuredContent so it satisfies MCP's object-only constraint.

Built-in prompts (shortcuts for common workflows)
- serp-analysis: Compare SERPs across two locations.
- backlink-gap: Find backlink opportunities vs. competitors.
- domain-traffic-competitors: Traffic + top competitors for a domain.
- keyword-clusters: Build intent-grouped keyword clusters.
- ai-share-of-voice: LLM-engine visibility vs. competitors.
Prefer these when the user's ask matches — they encode the recommended tool sequence.
`;
//# sourceMappingURL=instructions.js.map