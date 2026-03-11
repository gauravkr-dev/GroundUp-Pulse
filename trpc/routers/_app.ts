import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    // Example router, add your own routers here
});

// export type definition of API
export type AppRouter = typeof appRouter;