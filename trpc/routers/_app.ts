import { postIssueRouter } from '@/modules/citizen/server/procedures';
import { createTRPCRouter } from '../init';
import { issueRouter } from '@/modules/authority/server/procedures';

export const appRouter = createTRPCRouter({
    postIssue: postIssueRouter,
    issue: issueRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;