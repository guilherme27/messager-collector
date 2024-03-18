import { z } from 'zod';

const userSchema = z.object({
    nome: z.string(),
    cpfCnpj: z.string().min(11).max(11).or(z.string().min(14).max(14)),
    ispb: z.string().min(8).max(8),
    agencia: z.string().min(4).max(4),
    contaTransacional: z.string().min(7).max(7),
    tipoConta: z.string().min(2).max(4),
});

const schema = z.object({
    endToEndId: z.string().uuid(),
    valor: z.number().multipleOf(0.01),
    pagador: userSchema,
    recebedor: userSchema,
    campoLivre: z.string().optional(),
    txId: z.string().optional(),
    dataHoraPagamento: z.string().optional(),
});

export type Message = z.infer<typeof schema>;
export type User = z.infer<typeof userSchema>;

export default schema;
