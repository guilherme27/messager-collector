import { FastifyInstance } from 'fastify';

import { MessageController } from '../controllers';

import { ValidationMiddleware } from '../middlewares';
import { ParamsValidator } from '../validations';

const StartValidator = ValidationMiddleware(ParamsValidator.startSchema).validationInsert
const interatorValidator = ValidationMiddleware(ParamsValidator.interationSchema).validationInsert
const insertValidator = ValidationMiddleware(ParamsValidator.insertSchema).validationInsert

const MessageRoutes: RouterModule = (fastify: FastifyInstance, _, done) => {
  fastify.get('/api/pix/:ispb/stream/start', {preValidation: StartValidator} ,MessageController.messageStart);
  fastify.get('/api/pix/:ispb/stream/:interationId', {preValidation: interatorValidator}, MessageController.messageIterator);
  fastify.post('/api/util/msgs/:ispb/:number', {preValidation: insertValidator}, MessageController.addMessage);
  fastify.delete('/api/pix/:ispb/stream/:interationId', {preValidation: interatorValidator}, MessageController.messageCancel);
  done();
}

export default MessageRoutes;