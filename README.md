# messager-collector-api
## Desafio Backend - beeteller

Api desenvolvida para o desafio da Beeteller. A api foi desenvolvido com [NodeJS](https://nodejs.org/en) e [Fastify](https://fastify.dev/) como framework de desenvolvimento, utilizando como linguagem principal o TypeScript. Para fazer a persistência dos dados, foi utilizado o [PostgresSQL](https://www.postgresql.org/) e usado o [Vitest](https://vitest.dev/) para criação do teste de integração e de componente.

A escolha do Node foi feita devido a sugestão na descrição do desafio e também por ser a ferramenta na qual tenho maior experiência. O compilador de TypeScript foi utilizado o próprio Tsc, o Fastify foi escolhido por seu desenpenho nos processamentos de requisições e o [Prisma](https://www.prisma.io/) como ORM para gerenciar a conexão e a manipulação de dados com o banco de dados.

A api está online hospedado na render. Você pode acessar a partir do link abaixo:
[API](https://messager-collector.onrender.com/health)

### Observações:

    1 - Veja que o endpoint de acesso está apontando para o /health : Apenas retorna que a api está rodando
    
    2 - Os endpoints aceitos pela api são:
    
        get `/health` : verifica se o servidor está rodando - retorno 200
        
        post /api/util/msgs/[ispb]/[quantity] : cria novas mensagens pix (ispb: 8 digitos numéricos, quantity: valor numérico)
        
        get /api/pix/[ispb]/stream/start : abre um stream de consulta de mensagem(ns) pix pelo ispb 
        (header: accept: multipart/json para retornar até 10 mensagens por iteração) - retorno pull-next : iterationId
        
        get /api/pix/[ispb]/stream/[iterationId] : consulta a próxima iteração do stream requisição de mensagem(ns) pix 
        (header: accept: multipart/json para retornar até 10 mensagens por iteração) - retorno pull-next : iterationId
        
        delete /api/pix/[ispb]/stream/[iterationId] : Fecha o stream de consulta de mensagem(ns) e confirma o recebimento das mensagens lidas para evitar retorno duplicado no futuro - retorno 200
        
    3 - Lembre-se que a API rodando pelo servidor da render tem limitação de requisições consecutivas pois está em uso de um servidor gratuito
    e são limitações dada pela plataforma e como uma das regras é que ao demorar 5 min sem requisições a api ela é desativada e reativada após
    aproximadamente 1 min após a próxima requisição.
    
    4 - O banco de dados da API rodando na render é um banco de dados rodando live pelo NEON para evitar sobrecargas no servidor.


### Requisitos para execução

Antes de executarmos o projeto precisamos primeiro configurar algumas variáveis de ambiente.

Na pasta raiz do projeto crie um arquivo `.env` com os valores das seguintes variáveis:

```enviroment
    #Porta em que estára ouvindo as requisições da api (ex: 3000)
    PORT=3000
    #Host onde estará hospedado a api (ex: 0.0.0.0)
    HOST=0.0.0.0
    #Usuário do banco de dados postgres
    DB_USER= 
    #Senha do usuário do banco de dados
    DB_PASSWORD=
    #Nome do banco de dados
    DB_NAME=
    #Porta onde está o banco de dados    
    DB_PORT= 
    #Host onde está o banco de dados
    DB_HOST= 
    #Tempo a cada tentativa para verificação do banco para busca de informação quando sem conteudo (em ms)
    TIME_TO_RECHECK=500
    #Tempo em que se mantém buscando no banco de dados quando sem conteudo (em ms)
    #(para seguir os requisitos do desafio é necessário inserir 8000)
    TIME_TRYING=8000
```

Para a execução do projeto de forma local você pode executar em uma maquina virtual com o docker ou nativamente na sua máquina com o node.

##Execução local

Para executar nativamente você vai precisar de:

* [Node](https://nodejs.org/en/)
* Um gerenciador de pacotes de sua preferência, nesse passo a passo usaremos o [YARN](https://yarnpkg.com/) como padrão.

No arquivo `package.json` tem descritos todas as dependências do projeto. É essencial a instalação antes da execução do projeto. Para isso, você pode executar o seguinte comando:

```bash
yarn install
```

### Configuração do ORM

Para que deixemos o banco de dados com as tabelas e colunas da forma necessária para a aplicação e necessário executar o seguinte comando:

```bash
yarn migrate
```

### Testes

Para executar os testes e também gerar o arquivo de análise de cobertura podemos usar os seguintes comandos:

> Para executar os testes da api

```bash
yarn test
```

> Para executar os testes + os arquivos de análise de cobertura
    > Os arquivos de cobertura são gerados dentro da pasta coverage na raiz do projeto.

```bash
yarn coverage
```

### Execução

Após toda a instalação das dependências, e gerar as migrações no banco de dados é possível rodar o projeto, rodando o comando do **yarn**:

```bash
yarn dev
```

Vale lembrar que essa execução será feita em ambiente de desenvolvimento para executar em modo de excução de produção, pode ser executado os seguintes comandos:
    
> Para gerar o bundle de produção
```bash
yarn build
```
> Para executar o bundle
```bash
yarn start
```
##Execução por docker
Para executar a partir de uma máquina virtual com o docker, você vai precisar de:

* Ter o [Docker](https://www.docker.com/) instalado e executando.
* Executar o seguinte comando na raiz do projeto:

```bash
docker compose up
```

Após as imagens serem baixadas e os containers em execução você pode fazer as requisições de endpoint comentadas anteriormente com o host e porta definidos no seu arquivo de variaveis de ambiente 
    
