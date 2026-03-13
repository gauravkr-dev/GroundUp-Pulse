
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { postIssue } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { and, desc, eq } from "drizzle-orm";

// Omit `userId` from the client input schema because the server
// injects the authenticated user's id using `ctx.auth.user.id`.
export const postIssueInsertSchema = createInsertSchema(postIssue).omit({ userId: true });

export const postIssueRouter = createTRPCRouter({
    create: protectedProcedure
        .input(postIssueInsertSchema)
        .mutation(async ({ ctx, input }) => {
            const [PostIssue] = await db
                .insert(postIssue)
                .values({
                    ...input,
                    userId: ctx.auth.user.id,
                })
                .returning()

            return PostIssue;
        }),

    getMany: protectedProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.userId, ctx.auth.user.id),
                        eq(postIssue.status, "open")
                    )
                )
                .orderBy(desc(postIssue.createdAt), desc(postIssue.id))
            return data;
        }),
})