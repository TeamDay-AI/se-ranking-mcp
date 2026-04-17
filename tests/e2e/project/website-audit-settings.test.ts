import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import * as dotenv from 'dotenv';
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-console */
import { describe, expect, it } from 'vitest';

import { ProjectGetAuditSettings } from '../../../src/tools/project/website-audit/get-audit-settings.js';
import { ProjectListAuditSitemaps } from '../../../src/tools/project/website-audit/list-audit-sitemaps.js';
import { ProjectListAuditSourcePages } from '../../../src/tools/project/website-audit/list-audit-source-pages.js';
import { ProjectListAudits } from '../../../src/tools/project/website-audit/list-audits.js';
import { ProjectUpdateAuditSettings } from '../../../src/tools/project/website-audit/update-audit-settings.js';

dotenv.config();

const E2E_ENABLED = process.env.E2E_ENABLED === 'true';
const HAS_PROJECT_TOKEN = !!process.env.PROJECT_API_TOKEN;

describe('End-to-End Project Website Audit Settings', () => {
    const runOrSkip = E2E_ENABLED && HAS_PROJECT_TOKEN ? it : it.skip;

    if (!E2E_ENABLED) {
        console.warn('⚠️ E2E tests are skipped. Set E2E_ENABLED=true to run them.');
    } else if (!HAS_PROJECT_TOKEN) {
        console.warn('⚠️ Project API tests are skipped. Set PROJECT_API_TOKEN to run them.');
    }

    const getHandler = (tool: any) => {
        let handler: any;
        const mockRegister = {
            registerTool: (_name: string, _def: any, cb: any) => {
                handler = cb;
            },
        } as unknown as McpServer;
        tool.register(mockRegister);
        return handler;
    };

    const parse = (result: any) => JSON.parse(result.content[0].text);

    runOrSkip(
        'reads settings, sitemaps, source-pages and round-trips min_words without leaving a change',
        async () => {
            const listHandler = getHandler(new ProjectListAudits());
            const listResult = await listHandler({});
            const listBody = parse(listResult);
            const items = Array.isArray(listBody) ? listBody : (listBody.items ?? []);

            if (items.length === 0) {
                console.warn('⚠️ No audits found — skipping settings round-trip.');
                return;
            }

            const auditId = items[0].audit_id ?? items[0].id;
            expect(typeof auditId).toBe('number');
            console.log(`ℹ️ Using audit_id=${auditId}`);

            const getSettingsHandler = getHandler(new ProjectGetAuditSettings());
            const originalResult = await getSettingsHandler({ audit_id: auditId });
            const original = parse(originalResult);
            const originalSettings = original.settings ?? original;
            const originalMinWords = originalSettings.min_words;
            expect(typeof originalMinWords).toBe('number');
            console.log(`ℹ️ Original min_words=${originalMinWords}`);

            const sitemapsHandler = getHandler(new ProjectListAuditSitemaps());
            const sitemapsResult = await sitemapsHandler({ audit_id: auditId });
            console.log(`✅ Sitemaps: ${sitemapsResult.content[0].text.slice(0, 100)}...`);

            const sourcePagesHandler = getHandler(new ProjectListAuditSourcePages());
            const sourcePagesResult = await sourcePagesHandler({ audit_id: auditId });
            console.log(`✅ Source pages: ${sourcePagesResult.content[0].text.slice(0, 100)}...`);

            const updateHandler = getHandler(new ProjectUpdateAuditSettings());
            const newMinWords = originalMinWords === 250 ? 251 : 250;

            try {
                await updateHandler({
                    audit_id: auditId,
                    settings: { min_words: newMinWords },
                });

                const afterResult = await getSettingsHandler({ audit_id: auditId });
                const after = parse(afterResult);
                const afterSettings = after.settings ?? after;
                expect(afterSettings.min_words).toBe(newMinWords);
                console.log(`✅ Update applied: min_words=${afterSettings.min_words}`);
            } finally {
                await updateHandler({
                    audit_id: auditId,
                    settings: { min_words: originalMinWords },
                });
                console.log(`🧹 Restored min_words=${originalMinWords}`);
            }
        },
        60000,
    );
});
