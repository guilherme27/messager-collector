import { FastifyReply, FastifyRequest } from 'fastify';

import { Params } from '../validations/params.validation'
import { GenerateMessages, GenerateResponse }  from '@/common/helpers';
import { CollectorRepository, MessageRepository } from '../repositories';
import { MessageService } from '../services';

const messageStart = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb } = request.params as Params;
  const contentType = request.headers['accept'];

  const hasStarted = await CollectorRepository.hasStreamActive(ispb);
  const numberCollectors = await CollectorRepository.getNumberCollectors();  
  
  if (hasStarted.length !== 0) return response.status(400).send({error: 'stream already started'});
  
  if (numberCollectors >= 6) return response.status(429).send();
  
  await CollectorRepository.insertCollector(ispb);

  let res = await MessageService.findAll({ispb, contentType: contentType});

  res = GenerateResponse(res);

  if( res.length === 0) return response.status(204).send();

  if (res.length === 1) return response.status(200).headers({'Pull-Next': `${res[0].endToEndId}`}).send(res[0]);
  
  return response.status(200).headers({'Pull-Next': `${res[res.length-1].endToEndId}`}).send(res);
};

const messageIterator = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;
  const contentType = request.headers['accept'];

  const hasStarted = await CollectorRepository.hasStreamActive(ispb);

  if (hasStarted) {

    let res = await MessageService.findAll({ispb, contentType: contentType, interationId});

    res = GenerateResponse(res);

    if( res.length === 0) return response.status(204).send()

    if (res.length === 1) return response.status(200).headers({'Pull-Next': `${res[0].endToEndId}`}).send(res[0]);

    return response.status(200).headers({'Pull-Next': `${res[res.length-1].endToEndId}`}).send(res);
  }

  return response.status(400).send({ error: 'ispb not started' });
};

const messageCancel = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;

  const hasStarted = await CollectorRepository.hasStreamActive(ispb);

  if (hasStarted) {
    await CollectorRepository.deactivateStream(ispb, interationId);
    return response.status(200).send({});
  }

  return response.status(400).send({error: 'ispb not started'})
};

const addMessage = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, number } = request.params as Params;

  const messages = GenerateMessages(ispb.toString(), number);
  MessageRepository.insertData(messages);

  return response.status(201).send({})
};

export default { messageStart, messageIterator, messageCancel, addMessage };
