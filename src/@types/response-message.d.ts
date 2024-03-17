export type responseMessage = {
    endToEndId: string;
    valor: number;
    pagador: {
        ispb: string;
        nome: string;
        cpfCnpj: string;
        agencia: string;
        contaTransacional: string;
        tipoConta: string;
    },
    recebedor: {
        ispb: string;
        nome: string;
        cpfCnpj: string;
        agencia: string;
        contaTransacional: string;
        tipoConta: string;
    },
    campoLivre?: string | undefined;
    txId?: string | undefined;
    dataHoraPagamento?: string | undefined
}