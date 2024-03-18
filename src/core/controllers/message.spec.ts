import { FastifyRequest, FastifyReply } from 'fastify';

import { test, assert, beforeEach, afterEach, describe, it, expect, vi } from 'vitest';

import { MessageController } from './index';

import { CollectorRepository, MessageRepository } from '../repositories';
import { MessageService } from '../services';
import { ParamsStart } from '../validations/params.validation';

test('Controller Tests', () => {
  let mockRequest: Partial<FastifyRequest>;
  let mockReply: Partial<FastifyReply>;

  beforeEach(() => {
    mockRequest = {};
    mockReply = {
      status: vi.fn(),
      send: vi.fn(),
      headers: vi.fn(),
    };
  });

  describe('messageStart', () => {
    let mockParams: ParamsStart;

    it('should start stream', async () => {
      mockParams = { ispb: '25963220' };

      CollectorRepository.hasStreamActive = vi.fn().mockImplementation(async () => []);
      CollectorRepository.getNumberCollectors = vi.fn().mockImplementation(async () => 5);
      MessageService.findAll = vi.fn().mockImplementation(async () => [{ endToEndId: '1' }]);

      await MessageController.messageStart(mockRequest as FastifyRequest, mockReply as FastifyReply);

      expect(mockReply.status).toBe(200);
      expect(mockReply.headers['pull-next']).toBe(mockReply.send['endToEndId']);
      expect(mockReply.send).toBe(200);
    });
  });

  describe('messageIterator', () => {
    it('should iterate message', async () => {
      // Mockando a resposta do banco de dados
      CollectorRepository.hasStreamActive = Stub(async () => true);
      MessageService.findAll = Stub(async () => [{ endToEndId: '1' }]);

      await MessageController.messageIterator(mockRequest as FastifyRequest, mockReply as FastifyReply);

      assert.calledWith(mockReply.status, 200);
      assert.calledWith(mockReply.headers, { 'Pull-Next': '1' });
      assert.calledWith(mockReply.send, { endToEndId: '1' });
    });

    // Adicione mais testes conforme necessário
  });

  describe('messageCancel', () => {
    it('should cancel message', async () => {
      // Mockando a resposta do banco de dados
      CollectorRepository.hasStreamActive = Stub(async () => true);

      await MessageController.messageCancel(mockRequest as FastifyRequest, mockReply as FastifyReply);

      assert.calledWith(mockReply.status, 200);
      assert.calledWith(mockReply.send, {});
    });

    // Adicione mais testes conforme necessário
  });

  describe('addMessage', () => {
    it('should add message', async () => {
      await MessageController.addMessage(mockRequest as FastifyRequest, mockReply as FastifyReply);

      assert.called(MessageRepository.insertData);
      assert.calledWith(mockReply.status, 201);
      assert.calledWith(mockReply.send, {});
    });

    // Adicione mais testes conforme necessário
  });
});
