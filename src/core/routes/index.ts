import { FastifyInstance } from 'fastify';

import MessageRoutes from './message.router';

const routes = (fastify: FastifyInstance) => {
  fastify.register(MessageRoutes);
};

export default routes;