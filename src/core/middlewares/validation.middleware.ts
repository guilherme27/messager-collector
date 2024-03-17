import { DoneFuncWithErrOrRes, FastifyReply, FastifyRequest } from 'fastify';

import { ZodSchema } from 'zod';

const ValidationMiddleware = (schema: ZodSchema) => {
  const validationInsert = (request: FastifyRequest, reply: FastifyReply, done: DoneFuncWithErrOrRes) => {
    const params = schema.safeParse(request.params);

    if (!params.success) {
      return reply.status(400).send({error: params.error.formErrors});
    }

    done();
  };

  return { validationInsert };
};

export default ValidationMiddleware;
