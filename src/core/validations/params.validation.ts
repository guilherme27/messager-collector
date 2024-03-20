import { z } from 'zod';

const startSchema = z.object({
    ispb: z.string().regex(/^[0-9]{8}$/),
});

const insertSchema = z.object({
    ispb: z.string().regex(/^[0-9]{8}$/),
    number: z.string().regex(/^[0-9]+$/),
});

const interationSchema = z.object({
    ispb: z.string().regex(/^[0-9]+$/),
    interationId: z.string().uuid(),
});

const schema = z.object({
    ispb: z.string().min(8).max(8),
    interationId: z.string().uuid(),
    number: z.number(),
});

export type Params = z.infer<typeof schema>;
export type ParamsStart = z.infer<typeof startSchema>;
export type ParamsInsert = z.infer<typeof insertSchema>;
export type ParamsInteration = z.infer<typeof interationSchema>;

export default { schema, interationSchema, insertSchema, startSchema };
