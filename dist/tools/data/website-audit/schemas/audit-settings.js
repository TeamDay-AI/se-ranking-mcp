import { z } from 'zod';
const zeroOrOne = z.literal(0).or(z.literal(1));
export const dataAuditSettingsSchema = z
    .object({
    source_site: zeroOrOne
        .optional()
        .describe('Scan all pages by following internal links from the homepage. 0=no, 1=yes. Default: 1.'),
    source_sitemap: zeroOrOne
        .optional()
        .describe('Scan the sitemap.xml file. 0=no, 1=yes. Default: 1.'),
    source_subdomain: zeroOrOne
        .optional()
        .describe('Scan subdomains. If 0, subdomain links are treated as external. Default: 0.'),
    source_file: zeroOrOne
        .optional()
        .describe('Use a custom list of pages for the audit. 0=no, 1=yes. Default: 0.'),
    check_robots: zeroOrOne
        .optional()
        .describe('Follow robots.txt directives. 0=no, 1=yes. Default: 1.'),
    ignore_noindex: zeroOrOne
        .optional()
        .describe('Ignore pages with a noindex tag. 0=no, 1=yes. Default: 0.'),
    ignore_nofollow: zeroOrOne
        .optional()
        .describe('Ignore links with a nofollow attribute. 0=no, 1=yes. Default: 0.'),
    ignore_params: z
        .literal(0)
        .or(z.literal(1))
        .or(z.literal(2))
        .optional()
        .describe('Ignore URL parameters. 0=none, 1=all, 2=custom list (see custom_params). Default: 0.'),
    custom_params: z
        .string()
        .optional()
        .describe('Comma-separated list of URL parameters to ignore when ignore_params is 2.'),
    user_agent: z
        .number()
        .int()
        .min(0)
        .max(13)
        .optional()
        .describe('User-Agent for crawl. 0=SE Ranking bot, 1=Googlebot, 7=Chrome Windows, etc. Default: 0.'),
    login: z.string().optional().describe('Login for Basic HTTP Authentication.'),
    password: z.string().optional().describe('Password for Basic HTTP Authentication.'),
    max_pages: z
        .number()
        .int()
        .min(1)
        .max(300000)
        .optional()
        .describe('Maximum number of pages to crawl. Default: 1000.'),
    max_depth: z
        .number()
        .int()
        .min(1)
        .max(100)
        .optional()
        .describe('Maximum crawl depth. Default: 10.'),
    max_req: z
        .number()
        .int()
        .min(1)
        .max(500)
        .optional()
        .describe('Maximum requests per second. Default: 500.'),
    max_redirects: z
        .number()
        .int()
        .min(1)
        .max(50)
        .optional()
        .describe('Maximum redirects to follow. Default: 5.'),
    max_size: z
        .number()
        .int()
        .min(1)
        .max(100000)
        .optional()
        .describe('Maximum page size in kilobytes. Default: 3000.'),
    min_title_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Minimum length for the <title> tag. Default: 20.'),
    max_title_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Maximum length for the <title> tag. Default: 65.'),
    min_description_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Minimum length for the meta description. Default: 1.'),
    max_description_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Maximum length for the meta description. Default: 158.'),
    min_words: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Minimum word count per page. Default: 250.'),
    max_h1_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Maximum length for <h1> tags. Default: 100.'),
    max_h2_len: z
        .number()
        .int()
        .min(1)
        .max(10000)
        .optional()
        .describe('Maximum length for <h2> tags. Default: 100.'),
    allow: z
        .string()
        .optional()
        .describe('Only crawl URLs that start with these paths. Newline-separated. Empty string clears the list.'),
    disallow: z
        .string()
        .optional()
        .describe('Do not crawl URLs that start with these paths. Newline-separated. Empty string clears the list.'),
    disallow_ext: z
        .string()
        .optional()
        .describe('External URLs or domains to ignore when checking outbound links. Newline-separated (e.g. "cdn.example.com\\nhttps://tracking.example.com/pixel").'),
    hide: z
        .string()
        .optional()
        .describe('Hide URLs and resources starting with these paths from the report. Newline-separated.'),
    disabled_issues: z
        .array(z.string())
        .optional()
        .describe('Array of issue codes to disable for this audit (e.g. ["title_long","image_no_alt"]). Issue codes match those returned by DATA_getAuditReport under sections[].props[].code.'),
    send_report: zeroOrOne
        .optional()
        .describe('Send an email report when the audit completes. 0=no, 1=yes. Default: 1.'),
    report_email: z
        .string()
        .optional()
        .describe('Single email address for the audit report (legacy). Prefer report_emails.'),
    report_emails: z
        .string()
        .optional()
        .describe('Comma-separated list of email addresses for the audit report.'),
})
    .describe('Audit configuration. All fields optional. The Data API has no scheduler — scheduling settings (schedule_type, schedule_wdays, etc.) are not available here. CSR is implicit in the endpoint choice: createStandardAudit runs without JS rendering, createAdvancedAudit renders JS.');
//# sourceMappingURL=audit-settings.js.map