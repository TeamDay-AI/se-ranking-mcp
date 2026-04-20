import { z } from 'zod';
export declare const ExampleJsonFilter = "[[{\"type\":\"contains\",\"value\":\"seo\"},{\"type\":\"contains\",\"value\":\"tools\"}],[{\"type\":\"contains\",\"value\":\"backlinks\"}]]";
export declare const InvalidFilterMessage = "Must be a URL-encoded JSON array of groups (each group is a non-empty array of clauses with type in begins|contains|ends|exact and non-empty value).";
export declare const FilterClause: z.ZodObject<{
    type: z.ZodEnum<["begins", "contains", "ends", "exact"]>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "exact" | "begins" | "contains" | "ends";
}, {
    value: string;
    type: "exact" | "begins" | "contains" | "ends";
}>;
export declare const FilterGroup: z.ZodArray<z.ZodArray<z.ZodObject<{
    type: z.ZodEnum<["begins", "contains", "ends", "exact"]>;
    value: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string;
    type: "exact" | "begins" | "contains" | "ends";
}, {
    value: string;
    type: "exact" | "begins" | "contains" | "ends";
}>, "many">, "many">;
export declare const FilterGroupRefineCallback: (input: string | undefined) => boolean;
export declare const AISearchFilterObject: {
    filter_volume_from: z.ZodOptional<z.ZodNumber>;
    filter_volume_to: z.ZodOptional<z.ZodNumber>;
    filter_keyword_count_from: z.ZodOptional<z.ZodNumber>;
    filter_keyword_count_to: z.ZodOptional<z.ZodNumber>;
    filter_characters_count_from: z.ZodOptional<z.ZodNumber>;
    filter_characters_count_to: z.ZodOptional<z.ZodNumber>;
    filter_multi_keyword_included: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
    filter_multi_keyword_excluded: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, string | undefined>;
};
