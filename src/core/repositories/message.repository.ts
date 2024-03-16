import { db } from '@/common/libs';
import { User, Message } from '../validations/message.validation';

const CreateUser = async (users: User[]) => {
    const data = users.map((user) => {
        return {
            nome: user.nome,
            cpfcnpj: user.cpfCnpj,
            ispb: user.ispb,
            agencia: user.agencia,
            contaTransacional: user.contaTransacional,
            tipoconta: user.tipoConta
        };
    });

    return await db.user.createMany({
        data: data,
        skipDuplicates: true
    });
}

const CreateMessages = async (messages: Message[]) => {
    const data = messages.map((message) => {
        return {
            endToEndId: message.endToEndId,
            valor: message.valor,
            pagadorid: message.pagador.cpfCnpj,
            recebedorid: message.recebedor.cpfCnpj,
            txId: message.txId
        };
    })

    return await db.message.createMany({
        data: data
    });
}

const insertData = async (messages: Message[]) => {
    const pagadores = messages.map((user) => user.pagador);
    const recebedores = messages.map((user) => user.recebedor);
    const tempUsers = pagadores.concat(recebedores)
    
    try{
        await CreateUser(tempUsers); 
        await CreateMessages(messages);
    }catch (e) {
        console.log(e);
    }
};

const findMessages = async (ispb: string, limit: number = 1) => {
    const messages: Message[] = await db.$queryRaw`
        select m."endToEndId", m.valor, u1.nome as "nomeRecebedor", u1."cpfcnpj" as "cpfRecebedor", u1."ispb" as "ispbRecebedor",
        u1."agencia" as "agenciaRecebedor", u1."contaTransacional" as "contaRecebedor", u1."tipoconta" as "tipoRecebedor",
        u2.nome, u2."cpfcnpj", u2."ispb", u2."agencia", u2."contaTransacional", u2."tipoconta", m."campoLivre", m."txId", m."dataHoraPagamento"
        from "MESSAGE" m, "USER" u1, "USER" u2 
        where u1.cpfcnpj = m.recebedorid
        and u2.cpfcnpj = m.pagadorid
        and u1.ispb = ${ispb}
        order by m."endToEndId"
        limit ${limit}
    `;

    return messages;
};

const findMessagesIterable = async (ispb: string, interationId: string, limit: number = 1) => {
    const messages: Message[] = await db.$queryRaw`
        select m."endToEndId", m.valor, u1.nome as "nomeRecebedor", u1."cpfcnpj" as "cpfRecebedor", u1."ispb" as "ispbRecebedor",
        u1."agencia" as "agenciaRecebedor", u1."contaTransacional" as "contaRecebedor", u1."tipoconta" as "tipoRecebedor",
        u2.nome, u2."cpfcnpj", u2."ispb", u2."agencia", u2."contaTransacional", u2."tipoconta", m."campoLivre", m."txId", m."dataHoraPagamento"
        from "MESSAGE" m, "USER" u1, "USER" u2 
        where u1.cpfcnpj = m.recebedorid
        and u2.cpfcnpj = m.pagadorid
        and u1.ispb = ${ispb}
        and m."endToEndId" > ${interationId}
        order by m."endToEndId"
        limit ${limit}
    `;

    return messages;
};

export default {insertData, findMessages, findMessagesIterable};