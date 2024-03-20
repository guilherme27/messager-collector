import { responseMessage } from '@/@types/response-message';

const generateResponse = (messages: responseMessage[]) => {
    const resMessages = messages.map((message: any) => {
        return {
            endToEndId: message.endToEndId,
            valor: message.valor,
            pagador: {
                nome: message.nome,
                cpfCnpj: message.cpfCnpj,
                ispb: message.ispb,
                agencia: message.agencia,
                contaTransacional: message.contaTransacional,
                tipoConta: message.tipoConta,
            },
            recebedor: {
                nome: message.nomeRecebedor,
                cpfCnpj: message.cpfRecebedor,
                ispb: message.ispbRecebedor,
                agencia: message.agenciaRecebedor,
                contaTransacional: message.contaRecebedor,
                tipoConta: message.tipoRecebedor,
            },
            campoLivre: message.campoLivre ? message.campoLivre : '',
            txId: message.txId,
            dataHoraPagamento: message.dataHoraPagamento,
        };
    });

    return resMessages;
};

export default generateResponse;
