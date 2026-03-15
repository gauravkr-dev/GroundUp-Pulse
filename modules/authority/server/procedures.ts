import { db } from "@/db";
import { postIssue } from "@/db/schema";
import { authorityProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, or, and } from "drizzle-orm";
import z from "zod";

export const issueRouter = createTRPCRouter({
    getMany: authorityProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        or(
                            eq(postIssue.status, "open"),
                            eq(postIssue.status, "assigned")
                        )
                    )
                )
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to these issues.",
                });
            }
            return data;
        }),
    getOne: authorityProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const [data] = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        eq(postIssue.id, input.id),
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
    getManyClosed: authorityProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        or(
                            eq(postIssue.status, "resolved"),
                            eq(postIssue.status, "rejected")
                        )
                    )
                )
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to these issues.",
                });
            }
            return data;
        }),
    getEmergencyIssue: authorityProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.emergency, true),
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        or(
                            eq(postIssue.status, "open"),
                            eq(postIssue.status, "assigned")
                        )
                    )
                )
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You don't have access to these issues.",
                });
            }
            return data;
        }),
})