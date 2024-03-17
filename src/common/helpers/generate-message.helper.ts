import { Message } from '@/core/validations/message.validation'
import { uuidv7 as uuid } from 'uuidv7';
import generatePerson from './generate-person.helper';

const generateMessage = (ispb: string) => {
    const accountTypes = ['CA', 'CC', 'CP', 'CCO', 'CJ', 'CE', 'CB', 'CDI', 'CACC', 'SVGS']

    const persons = generatePerson(2);
    const message: Message = {
        endToEndId: uuid(),
        valor: Math.floor(Math.random() * 100),
        pagador: {
            nome: persons[0].name,
            cpfCnpj: persons[0].cpf,
            ispb: Math.floor(Math.random() * 100000000).toString().padStart(8, '0'),
            agencia: Math.floor(Math.random() * 1000).toString().padStart(4, '0'),
            contaTransacional: Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
            tipoConta: accountTypes[Math.floor(Math.random() * 10)]
        },
        recebedor: {
            nome: persons[1].name,
            cpfCnpj: persons[1].cpf,
            ispb: ispb,
            agencia: Math.floor(Math.random() * 1000).toString().padStart(4, '0'),
            contaTransacional: Math.floor(Math.random() * 10000000).toString().padStart(7, '0'),
            tipoConta: accountTypes[Math.floor(Math.random() * 10)]
        },
        txId: uuid()
    }
 
    return message;
}

const generateMessages = (ispb: string, quantity: number = 1) => {
    const messages = new Array(quantity).fill(null);
    for (let i = 0; i < quantity; i++ ){
        messages[i] = generateMessage(ispb)
    }    

    return messages;
}

export default generateMessages