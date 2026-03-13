
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { postIssue } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { and, desc, eq, or } from "drizzle-orm";
import z from "zod";
import { TRPCError } from "@trpc/server";

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
                        or(
                            eq(postIssue.status, "open"),
                            eq(postIssue.status, "assigned")
                        )
                    )
                )
                .orderBy(desc(postIssue.createdAt), desc(postIssue.id))
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to these issues.",
                });
            }
            return data;

        }),
    getOne: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const [data] = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.id, input.id),
                        eq(postIssue.userId, ctx.auth.user.id)
                    )
                )
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Issue not found or you don't have access to it.",
                });
            }
            return data;
        }),
    getManyClosed: protectedProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.userId, ctx.auth.user.id),
                        or(
                            eq(postIssue.status, "resolved"),
                            eq(postIssue.status, "rejected")
                        )
                    )
                )
                .orderBy(desc(postIssue.createdAt), desc(postIssue.id))
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to these issues.",
                });
            }
            return data;
        }),
})