import { FastifyReply, FastifyRequest } from 'fastify';

import { Params } from '../validations/params.validation'
import { GenerateMessages, GenerateResponse }  from '@/common/helpers';
import { MessageRepository } from '../repositories';
import { MessageService } from '../services';

const collectors = new Array(6).fill(0);

const messageStart = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb } = request.params as Params;
  const contentType = request.headers['accept'];

  if (collectors.includes(ispb) || collectors.indexOf(0) === -1) {
    console.log('Too many requests'); 
    return response.status(429).send({ error: 'too many requests' });
  }

  collectors[collectors.indexOf(0)] = ispb;

  console.log(`\nispb = ${ispb} content-type = ${contentType}\n`)

  let res = await MessageService.findAll({ispb, contentType: contentType});

  res = GenerateResponse(res);

  if( res.length === 0) return response.status(204).send({error: 'No content'})

  if (res.length === 1) return response.status(200).headers({'Pull-Next': `${res[0].endToEndId}`}).send(res[0]);
  
  return response.status(200).headers({'Pull-Next': `${res[res.length-1].endToEndId}`}).send(res);
};

const messageIterator = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;
  const contentType = request.headers['accept'];

  if (collectors.includes(ispb)) {

    let res = await MessageService.findAll({ispb, contentType: contentType, interationId});

    res = GenerateResponse(res);

    if( res.length === 0) return response.status(204).send({error: 'No content'})

    if (res.length === 1) return response.status(200).headers({'Pull-Next': `${res[0].endToEndId}`}).send(res[0]);

    return response.status(200).headers({'Pull-Next': `${res[res.length-1].endToEndId}`}).send(res);
  }

  return response.status(204).send({ error: 'ispb not started' });
};

const messageCancel = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, interationId } = request.params as Params;

  if (collectors.includes(ispb)) {
    collectors[collectors.indexOf(ispb)] = 0;
    console.log('removed from collectors');
    return response.status(200).send({});
  }
};

const addMessage = async (request: FastifyRequest, response: FastifyReply) => {
  const { ispb, number } = request.params as Params;

  const messages = GenerateMessages(ispb.toString(), number);
  MessageRepository.insertData(messages);

  return response.status(201).send({})
};

export default { messageStart, messageIterator, messageCancel, addMessage};
