import { FastifyInstance } from 'fastify';

import { MessageController } from '../controllers';

const MessageRoutes: RouterModule = (fastify: FastifyInstance, _, done) => {
  fastify.get('/api/pix/:ispb/stream/start', MessageController.messageStart);
  fastify.get('/api/pix/:ispb/stream/:interationId', MessageController.messageIterator);
  fastify.delete('/api/pix/:ispb/stream/:interationId', MessageController.messageCancel);
  done();
}

export default MessageRoutes;