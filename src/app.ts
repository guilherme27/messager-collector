import Fastify from 'fastify'

import routes from '@/core/routes';


const fastify = Fastify({ logger: true })

routes(fastify);


// Run the server!
fastify.listen({ port: 3000 })