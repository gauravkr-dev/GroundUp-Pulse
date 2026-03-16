import { db } from "@/db";
import { postIssue, user } from "@/db/schema";
import { authorityProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, or, and } from "drizzle-orm";
import z from "zod";

export const issueRouter = createTRPCRouter({
    getMany: authorityProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select(
                    {
                        id: postIssue.id,
                        title: postIssue.title,
                        describe_issue: postIssue.describe_issue,
                        createdAt: postIssue.createdAt,
                        status: postIssue.status,
                        priority_score: postIssue.priority_score,
                        emergency: postIssue.emergency,
                        user: {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }
                    }
                )
                .from(postIssue)
                .leftJoin(user, eq(postIssue.userId, user.id))
                .where(
                    and(
                        eq(postIssue.emergency, false),
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
                .select(
                    {
                        id: postIssue.id,
                        title: postIssue.title,
                        describe_issue: postIssue.describe_issue,
                        createdAt: postIssue.createdAt,
                        status: postIssue.status,
                        priority_score: postIssue.priority_score,
                        emergency: postIssue.emergency,
                        images: postIssue.images,
                        department: postIssue.department,
                        latitude: postIssue.latitude,
                        longitude: postIssue.longitude,
                        address: postIssue.address,
                        user: {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }
                    }
                )
                .from(postIssue)
                .leftJoin(user, eq(postIssue.userId, user.id))
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
                .select(
                    {
                        id: postIssue.id,
                        title: postIssue.title,
                        describe_issue: postIssue.describe_issue,
                        createdAt: postIssue.createdAt,
                        status: postIssue.status,
                        priority_score: postIssue.priority_score,
                        emergency: postIssue.emergency,
                        user: {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }
                    }
                )
                .from(postIssue)
                .leftJoin(user, eq(postIssue.userId, user.id))
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
                .select(
                    {
                        id: postIssue.id,
                        title: postIssue.title,
                        describe_issue: postIssue.describe_issue,
                        createdAt: postIssue.createdAt,
                        status: postIssue.status,
                        priority_score: postIssue.priority_score,
                        emergency: postIssue.emergency,
                        user: {
                            id: user.id,
                            name: user.name,
                            image: user.image,
                        }
                    }
                )
                .from(postIssue)
                .leftJoin(user, eq(postIssue.userId, user.id))
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