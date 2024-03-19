import fastify, { FastifyRequest, FastifyReply } from 'fastify';

import { describe, it, expect, vi } from 'vitest';

import { MessageController } from './index';

import { CollectorRepository, MessageRepository } from '../repositories';
import { MessageService } from '../services';
import { ParamsStart } from '../validations/params.validation';

describe.skip('messageStart', () => {
    it('should start stream', async () => {
        // fastify.inject(
        //     {
        //         method: String,
        //         url: String,
        //         payload: Object,
        //         headers: Object,
        //     },
        //     (error, response) => {
        //         const mockParams: ParamsStart = { ispb: '25963220' };
        //         mockRequest = { params: mockParams, headers: { accept: 'application/json' } };
        //         mockReply = {
        //             status: vi.fn(),
        //             send: vi.fn(),
        //             headers: vi.fn(),
        //         };
        //         CollectorRepository.hasStreamActive = vi.fn().mockImplementation(async () => []);
        //         CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(async () => 0);
        //         MessageService.findAll = vi
        //             .fn()
        //             .mockImplementation(async () => [{ endToEndId: '018e5239-bf5e-7e7c-89c7-f3587bf780bd' }]);
        //         const request: FastifyRequest = {};
        //         await MessageController.messageStart(mockRequest as FastifyRequest, mockReply as FastifyReply);
        //         expect(mockReply.status).toBe(200);
        //         expect(mockReply.send).toBeCalled();
        //     },
        // );
    });

    // it('should deny a request for a stream', async () => {
    //     const response = await app.inject({
    //         method: 'GET',
    //         url: '/sua-rota-aqui',
    //     });

    //     const response = await request(app).get('/sua-rota-aqui');
    //     expect(response.status).toBe(200);
    // });
});

//     describe('messageIterator', () => {
//         it('should iterate message', async () => {
//             // Mockando a resposta do banco de dados
//             CollectorRepository.hasStreamActive = Stub(async () => true);
//             MessageService.findAll = Stub(async () => [{ endToEndId: '1' }]);

//             await MessageController.messageIterator(mockRequest as FastifyRequest, mockReply as FastifyReply);

//             assert.calledWith(mockReply.status, 200);
//             assert.calledWith(mockReply.headers, { 'Pull-Next': '1' });
//             assert.calledWith(mockReply.send, { endToEndId: '1' });
//         });

//         // Adicione mais testes conforme necessário
//     });

//     describe('messageCancel', () => {
//         it('should cancel message', async () => {
//             // Mockando a resposta do banco de dados
//             CollectorRepository.hasStreamActive = Stub(async () => true);

//             await MessageController.messageCancel(mockRequest as FastifyRequest, mockReply as FastifyReply);

//             assert.calledWith(mockReply.status, 200);
//             assert.calledWith(mockReply.send, {});
//         });

//         // Adicione mais testes conforme necessário
//     });

//     describe('addMessage', () => {
//         it('should add message', async () => {
//             await MessageController.addMessage(mockRequest as FastifyRequest, mockReply as FastifyReply);

//             assert.called(MessageRepository.insertData);
//             assert.calledWith(mockReply.status, 201);
//             assert.calledWith(mockReply.send, {});
//         });

//         // Adicione mais testes conforme necessário
//     });
