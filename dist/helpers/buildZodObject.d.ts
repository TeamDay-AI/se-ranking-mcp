import { z } from 'zod';
export declare const buildZodObject: (inputSchema: Record<string, any> | undefined) => z.ZodObject<Record<string, z.ZodTypeAny>, "strip", z.ZodTypeAny, {
    [x: string]: any;
}, {
    [x: string]: any;
}>;
