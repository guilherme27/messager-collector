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
        }
    });

    return await db.user.createMany({
        data: data
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
        }
    })

    return await db.message.createMany({
        data: data
    });
}

const insertData = async (messages: Message[]) => {
    const pagadores = messages.map((user) => user.pagador);
    const recebedores = messages.map((user) => user.recebedor);

    try{
        await CreateUser([...pagadores, ...recebedores]);
        await CreateMessages(messages);
    }catch (e) {
        console.log(e);
    }
}

const findMessages = async (ispb: string, limit: number = 1) => {
    const messages: Message[] = await db.$queryRaw`
        select * from "MESSAGE" m, "USER" u 
        where u.cpfcnpj = m.recebedorid
        and u.ispb = ${ispb}
        order by m."dataHoraPagamento"
        limit ${limit} 
    `;
    return messages
};

export default {insertData, findMessages};