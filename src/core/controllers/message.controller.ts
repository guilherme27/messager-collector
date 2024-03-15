import { FastifyReply, FastifyRequest } from 'fastify';

import { Params } from '../validations/params.validation'
import { generateMessages }  from '@/common/helpers';
import { MessageRepository } from '../repositories';

const collectors = new Array(6).fill(0);

const messageStart = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb } = request.params as Params;

  if (collectors.includes(ispb) || collectors.indexOf(0) === -1) {
    console.log('Too many requests');
    return response.status(429).send({ error: 'too many requests' });
  }

  collectors[collectors.indexOf(0)] = ispb;
  
  if (request.headers['content-type']?.startsWith('multipart')) {
    await response.status(200).send(MessageRepository.findMessages(ispb, 10));
  }
  
  await response.status(200).send(MessageRepository.findMessages(ispb));
};

const messageIterator = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;

  if (collectors.includes(ispb)) {
    console.log('Respond a new');
    return response.status(200).send({ collectors, code: 'xxx' });
  }

  return response.status(204).send({ error: 'ispb not started' });
};

const messageCancel = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;

  if (collectors.includes(ispb)) {
    collectors[collectors.indexOf(ispb)] = 0;
    console.log('removed from collectors');
    return response.status(200).send({collectors});
  }
};

const addMessage = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, number } = request.params as Params;

  const messages = generateMessages(ispb.toString(), number);
  MessageRepository.insertData(messages);

  return response.status(201).send({})
};

export default { messageStart, messageIterator, messageCancel, addMessage};
