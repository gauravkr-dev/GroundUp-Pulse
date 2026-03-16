import { postIssueRouter } from '@/modules/citizen/server/procedures';
import { createTRPCRouter } from '../init';
import { issueRouter } from '@/modules/authority/server/procedures';
import { messageRouter } from '@/modules/messages/server/procedures';
import { userRouter } from '@/modules/user/server/procedures';

export const appRouter = createTRPCRouter({
    postIssue: postIssueRouter,
    issue: issueRouter,
    message: messageRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;