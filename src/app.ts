import Fastify, { FastifyReply } from 'fastify';

import 'dotenv/config';

import routes from '@/core/routes';

const PORT = (process.env.PORT && Number(process.env.PORT)) || 3000;
const HOST = process.env.HOST || '0.0.0.0';

const fastify = Fastify({ logger: true });
routes(fastify);
fastify.get('/health', (_, reply: FastifyReply) => reply.status(200).send('server is running'));

fastify.listen({ port: PORT, host: HOST });

export default fastify;
