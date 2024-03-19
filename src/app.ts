import Fastify from 'fastify';

import dotenv from 'dotenv';

import routes from '@/core/routes';

dotenv.config();

const fastify = Fastify({ logger: true });
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 3000;

routes(fastify);

fastify.listen({ port: PORT });

export default fastify;
