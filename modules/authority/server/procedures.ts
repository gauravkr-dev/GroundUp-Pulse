/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/db";
import { postIssue, user } from "@/db/schema";
import { authorityProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { eq, or, and, count } from "drizzle-orm";
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
                        rejectReason: postIssue.rejectReason,
                        rejectImages: postIssue.rejectImages,
                        rejectedBy: postIssue.rejectedBy,
                        rejectedAt: postIssue.rejectedAt,
                        resolveComment: postIssue.resolveComment,
                        resolveImages: postIssue.resolveImages,
                        resolvedBy: postIssue.resolvedBy,
                        resolvedAt: postIssue.resolvedAt,
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

    getStats: authorityProcedure
        .query(async ({ ctx }) => {
            const [opened] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        eq(postIssue.status, "open")
                    )
                )
            const [assigned] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        eq(postIssue.status, "assigned")
                    )
                )
            const [resolved] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        eq(postIssue.status, "resolved")
                    )
                )
            const [rejected] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.department, ctx.auth.user.department || ""),
                        eq(postIssue.status, "rejected")
                    )
                )
            return {
                opened: opened.value,
                assigned: assigned.value,
                resolved: resolved.value,
                rejected: rejected.value,
            }
        }),

    updateIssue: authorityProcedure
        .input(z.object({
            id: z.string(),
            status: z.enum(["open", "assigned", "resolved", "rejected"]),
            rejectReason: z.string().optional(),
            rejectImages: z.array(z.string()).optional(),
            rejectedBy: z.string().optional(),
            resolveComment: z.string().optional(),
            resolveImages: z.array(z.string()).optional(),
            resolvedBy: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            // Fetch the issue to ensure it exists and belongs to the authority's department
            const [issue] = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.id, input.id),
                        eq(postIssue.department, ctx.auth.user.department || "")
                    )
                );
            if (!issue) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "Issue not found or you don't have access to it.",
                });
            }

            // Update the issue with new status and related fields
            await db
                .update(postIssue)
                .set({
                    status: input.status,
                    rejectReason: input.rejectReason,
                    rejectImages: input.rejectImages,
                    rejectedBy: input.rejectedBy,
                    resolveComment: input.resolveComment,
                    resolveImages: input.resolveImages,
                    resolvedBy: input.resolvedBy,
                    resolvedAt: input.status === "resolved" ? new Date() : undefined,
                    rejectedAt: input.status === "rejected" ? new Date() : undefined,
                })
                .where(eq(postIssue.id, input.id));
            return { success: true };
        }),
})


export const authorityRouter = createTRPCRouter({
    user: authorityProcedure
        .query(async ({ ctx }) => {
            const data = await db
                .select({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    department: user.department,
                })
                .from(user)
                .where(eq(user.id, ctx.auth.user.id))
            if (!data || data.length === 0) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "User not found.",
                });
            }
            return data[0];
        }),

    users: authorityProcedure
        .query(async ({ ctx }) => {
            const dept = ctx.auth.user.department;
            if (!dept) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "No department associated with your account.",
                });
            }
            const data = await db
                .select({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    image: user.image,
                    department: user.department,
                    createdAt: user.createdAt,
                })
                .from(user)
                .where(
                    eq(user.department, dept as any)
                )
            if (!data) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "No users found in your department.",
                });
            }
            return data;
        }),
})