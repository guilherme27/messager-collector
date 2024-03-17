const nomes = ["Ana", "João", "Pedro", "Mariana", "Carla", "Fernando", "Luisa", "Rafael", "Maria", "Lucas", "Camila", "Gustavo", "Juliana", "Diego", "Roberta", "Bruno", "André", "Laura", "Eduardo", "Isabela", "Felipe", "Patrícia", "Gabriel", "Daniela", "Mateus", "Adriana", "Vitor", "Aline", "Rodrigo", "Vanessa", "Cristiano", "Renata", "Marcelo", "Tatiane", "Fábio", "Ana Paula", "Ricardo", "Juliana", "Leandro", "Natália"];

const sobrenomes = ["Silva", "Santos", "Oliveira", "Souza", "Pereira", "Almeida", "Ferreira", "Costa", "Rodrigues", "Nascimento", "Lima", "Araujo", "Ribeiro", "Gonçalves", "Carvalho", "Martins", "Castro", "Dias", "Fernandes", "Barbosa", "Correia", "Gomes", "Cardoso", "Mendes", "Nunes", "Azevedo", "Vieira", "Monteiro", "Moreira", "Correia", "Melo", "Batista", "Carneiro", "Rocha", "Machado", "Freitas", "Ramos", "Lopes", "Teixeira", "Morais", "Pinto"];

const generateName = () => {
    return nomes[Math.floor(Math.random() * nomes.length)] + " " + sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
}

const generateCPF = () => {
    const randomDigit = () => Math.floor(Math.random() * 10);

    let cpfPartial = `${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}${randomDigit()}`;

    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpfPartial[i]) * (10 - i);
    }
    let digit1 = 11 - (sum % 11);
    if (digit1 > 9) digit1 = 0;

    sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpfPartial[i]) * (11 - i);
    }
    sum += digit1 * 2;
    let digit2 = 11 - (sum % 11);
    if (digit2 > 9) digit2 = 0;

    return `${cpfPartial}${digit1}${digit2}`;
}

const generatePerson = (quantity: number = 1) => {

    const persons = new Array(quantity).fill(null);

    return persons.map(() => {
        return {
            name: generateName(),
            cpf: generateCPF()
        };
    });
}


export default generatePerson;
