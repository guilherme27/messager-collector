import { z } from 'zod';

const schema = z.object({
    ispb: z.string().min(8).max(8),
    interationId: z.string().uuid(),
    number: z.number()
});

export type Params = z.infer<typeof schema>;

export default schema;
