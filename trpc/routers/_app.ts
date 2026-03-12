import { postIssueRouter } from '@/modules/post_issue/server/procedures';
import { createTRPCRouter } from '../init';

export const appRouter = createTRPCRouter({
    postIssue: postIssueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;