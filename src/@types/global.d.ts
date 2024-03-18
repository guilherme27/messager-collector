import { FastifyInstance } from 'fastify';

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT?: string;
            DB_USER: string;
            DB_PASSWORD: string;
            DB_NAME: string;
            DB_PORT: number;
            DB_HOST: string;
            DB_URL: string;
            JWT_SECRET: string;
        }
    }

    type RouterModule = (
        fastify: FastifyInstance,
        _: { prefix: string },
        done: (err?: Error | undefined) => void,
    ) => void;
}
