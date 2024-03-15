import Fastify from 'fastify'
import dotenv from 'dotenv';

dotenv.config()

import routes from '@/core/routes';


const fastify = Fastify({ logger: true })

routes(fastify);

console.log(process.env.DB_URL);

// Run the server!
fastify.listen({ port: 3000 })