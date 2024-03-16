import { Message } from "@prisma/client";

const generateResponse = (messages: any[]) => {
    const resMessages = messages.map((message: any) => {
        return {
            endToEndId: message.endToEndId,
            valor: message.valor,
            pagador: { 
                nome: message.nome,
                cpfCnpj: message.cpfcnpj,
                ispb: message.ispb,
                agencia: message.agencia,
                contaTransacional: message.contaTransacional,
                tipoConta: message.tipoconta,
            },
            recebedor: {
                nome: message.nomeRecebedor,
                cpfCnpj: message.cpfRecebedor,
                ispb: message.ispbRecebedor,
                agencia: message.agenciaRecebedor,
                contaTransacional: message.contaRecebedor,
                tipoConta: message.tipoRecebedor,
            },
            campoLivre: message.campoLivre?message.campoLivre:"",
            txId: message.txId,
            dataHoraPagamento: message.dataHoraPagamento
        }
    });
    
    return resMessages;
}

export default generateResponse;