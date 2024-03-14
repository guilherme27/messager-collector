import { FastifyReply, FastifyRequest } from "fastify";

const collectors = new Array(6).fill(0);

const messageStart = async (request: FastifyRequest, response: FastifyReply ) => {
  const { ispb } = request.params;

  if (request.headers["content-type"]?.startsWith('multipart')) console.log('finded');

  if (collectors.includes(ispb) || collectors.indexOf(0) === -1){
    console.log('Too many requests');
    return response.status(429).send({error: 'too many requests'});
  }

  collectors[collectors.indexOf(0)] = ispb;

  response.status(200).send({collectors});
}

const messageIterator = async (request: FastifyRequest, response: FastifyReply ) => {
  const { ispb, interationId } = request.params;

  if (collectors.includes(ispb)){
    console.log('Respond a new');
    return response.status(200).send({collectors, code: 'xxx'});
  }

  return response.status(204).send({error: 'ispb not started'});
}

const messageCancel = async (request: FastifyRequest, response: FastifyReply ) => {
  const { ispb, interationId } = request.params;

  if (collectors.includes(ispb)){
    collectors[collectors.indexOf(ispb)] = 0;
    console.log('removed from collectors');
    return response.status(200).send({collectors, code: 'removed'});
  }

}


export default { messageStart, messageIterator, messageCancel };