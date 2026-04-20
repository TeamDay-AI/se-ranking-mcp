import { z } from 'zod';
export declare const commonSchemas: {
    domain: z.ZodString;
    target: z.ZodString;
    source: z.ZodString;
    limit: z.ZodOptional<z.ZodNumber>;
    offset: z.ZodOptional<z.ZodNumber>;
    engine: z.ZodString;
};
