import Fastify from 'fastify';

import 'dotenv/config';

import routes from '@/core/routes';

const fastify = Fastify({ logger: true });
const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;
const HOST = process.env.HOST || '0.0.0.0';
routes(fastify);

fastify.listen({ port: PORT, host: HOST });

export default fastify;
