import Fastify from 'fastify'
import dotenv from 'dotenv';

dotenv.config()

import routes from '@/core/routes';


const fastify = Fastify({ logger: true })

routes(fastify);

fastify.listen({ port: 3000 })