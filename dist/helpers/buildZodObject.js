import { z } from 'zod';
export const buildZodObject = (inputSchema) => {
    const shape = inputSchema ?? {};
    return z.object(shape);
};
//# sourceMappingURL=buildZodObject.js.map