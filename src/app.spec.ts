import supertest from 'supertest';
import { it, describe, afterAll, expect, vi } from 'vitest';

import fastify from './app';
import { MessageRepository, CollectorRepository } from './core/repositories';

afterAll(() => {
    fastify.close();
});

const mockMessage = [
    {
        endToEndId: '018e5439-14d4-7d97-b3d2-e976885eb0ce',
        valor: '54',
        pagador: {
            nome: 'Gabriel Freitas',
            cpfCnpj: '72209090717',
            ispb: '63592417',
            agencia: '0880',
            contaTransacional: '4503658',
            tipoConta: 'CJ',
        },
        recebedor: {
            nomeRecebedor: 'Leandro Correia',
            cpfRecebedor: '92252765089',
            ispbRecebedor: '25963208',
            agenciaRecebedor: '0647',
            contaRecebedor: '6872308',
            tipoRecebedor: 'CP',
        },
        campoLivre: '',
        txId: '018e5439-14d4-7d97-b3d2-e977ca92a9c1',
        dataHoraPagamento: '2024-03-19T01:00:10.856Z',
    },
];

describe('Test messager-collector-api', async () => {
    await fastify.ready();

    it('Test start stream route with invalid params', async () => {
        const props = {
            url: `/api/pix/220210/stream/start`,
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return;
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return;
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
    });

    it('Test start stream route with response', async () => {
        const props = {
            url: `/api/pix/22021054/stream/start`,
        };

        CollectorRepository.insertCollector = vi.fn().mockImplementation(() => { });
        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => []);
        CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(() => 0);

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [mockMessage[0]];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [mockMessage[0]];
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'application/json');

        expect(response.status).toEqual(200);
        expect(response.headers['pull-next']).not.empty;
        expect(MessageRepository.findMessages).toBeCalledTimes(1);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
    });

    it('Test start stream route with no response', async () => {
        const props = {
            url: `/api/pix/22021054/stream/start`,
        };

        CollectorRepository.insertCollector = vi.fn().mockImplementation(() => { });
        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => []);
        CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(() => 0);

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [];
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'application/json');

        expect(response.status).toEqual(204);
        expect(MessageRepository.findMessages).toBeCalledTimes(16);
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
    }, 8000);

    it('Test start stream route with stream already started', async () => {
        const props = {
            url: `/api/pix/22021054/stream/start`,
        };

        CollectorRepository.insertCollector = vi.fn().mockImplementation(() => { });
        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => [0]);
        CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(() => 0);

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return [mockMessage[0]];
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return [mockMessage[0]];
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'application/json');

        expect(response.status).toEqual(400);
        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
    });

    it('Test insert message route with wrong params', async () => {
        const props = {
            url: `/api/util/msgs/2596320/8a`,
        };

        MessageRepository.insertData = vi.fn().mockImplementation(() => {
            return;
        });

        const response = await supertest(fastify.server).post(props.url);

        expect(response.status).toEqual(400);
        expect(MessageRepository.insertData).not.toBeCalled();
    });

    it('Test insert message route with wrong params', async () => {
        const props = {
            url: `/api/util/msgs/25963260/8`,
        };

        MessageRepository.insertData = vi.fn().mockImplementation(() => {
            return;
        });

        const response = await supertest(fastify.server).post(props.url);

        expect(response.status).toEqual(201);
        expect(MessageRepository.insertData).toBeCalledTimes(1);
    });

    it('Test iteration stream route with invalid params', async () => {
        const props = {
            url: `/api/pix/2596320m/stream/018e5439-14d4`,
        };

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return;
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return;
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'multipart/json');

        expect(response.status).toEqual(400);
        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).not.toBeCalled();
    });

    it('Test iteration stream route with response and test twice', async () => {
        const props = {
            url: `/api/pix/25963202/stream/018e5439-14d4-7d97-b3d2-e978ae40a191`,
        };

        CollectorRepository.insertCollector = vi.fn().mockImplementation(() => { });
        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => [0]);
        CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(() => 0);

        MessageRepository.findMessages = vi.fn().mockImplementation(() => {
            return mockMessage;
        });

        MessageRepository.findMessagesIterable = vi.fn().mockImplementation(() => {
            return mockMessage;
        });

        const response = await supertest(fastify.server).get(props.url).set('Accept', 'multipart/json');

        expect(response.status).toEqual(200);
        expect(response.headers['pull-next']).not.empty;
        expect(response.headers['pull-next']).not.toEqual('018e5439-14d4-7d97-b3d2-e978ae40a191');
        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(1);

        const response2th = await supertest(fastify.server).get(props.url).set('Accept', 'multipart/json');

        expect(response2th.status).toEqual(200);
        expect(MessageRepository.findMessages).not.toBeCalled();
        expect(MessageRepository.findMessagesIterable).toBeCalledTimes(2);
    });

    it('Test cancel stream route with invalid params', async () => {
        const props = {
            url: `/api/pix/2596308/stream/018e5439-14d4`,
        };

        CollectorRepository.deactivateStream = vi.fn().mockImplementation(() => {
            return;
        });

        const response = await supertest(fastify.server).delete(props.url);

        expect(response.status).toEqual(400);
        expect(CollectorRepository.deactivateStream).not.toBeCalled();
    });

    it('Test cancel stream route with success', async () => {
        const props = {
            url: `/api/pix/25963208/stream/018e5439-14d4-7d97-b3d2-e978ae40a191`,
        };

        CollectorRepository.deactivateStream = vi.fn().mockImplementation(() => {
            return;
        });

        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => [0]);

        const response = await supertest(fastify.server).delete(props.url);

        expect(response.status).toEqual(200);
        expect(CollectorRepository.deactivateStream).toBeCalledTimes(1);
    });

    it('Test cancel stream route without a active stream', async () => {
        const props = {
            url: `/api/pix/25963208/stream/018e5439-14d4-7d97-b3d2-e978ae40a191`,
        };

        CollectorRepository.deactivateStream = vi.fn().mockImplementation(() => {
            return;
        });

        CollectorRepository.hasStreamActive = vi.fn().mockImplementation(() => []);

        const response = await supertest(fastify.server).delete(props.url);

        expect(response.status).toEqual(400);
        expect(CollectorRepository.deactivateStream).not.toBeCalled();
    });
});
