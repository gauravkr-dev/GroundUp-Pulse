import { db } from "@/db";
import { messages } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, asc, and, ne } from "drizzle-orm";
import z from "zod";

export const messageRouter = createTRPCRouter({
    sendMessage: protectedProcedure
        .input(z.object({
            issueId: z.string(),
            text: z.string().optional(),
            imageUrl: z.string().optional(),
        }))
        .mutation(async ({ ctx, input }) => {
            const message = await db
                .insert(messages)
                .values({
                    issueId: input.issueId,
                    senderId: ctx.auth.user.id,
                    role: ctx.auth.user.role as "citizen" | "authority",
                    text: input.text,
                    imageUrl: input.imageUrl,
                })
                .returning();
            return message;
        }),

    getMessages: protectedProcedure
        .input(z.object({
            issueId: z.string(),
        }))
        .query(async ({ input }) => {
            const msgs = await db
                .select()
                .from(messages)
                .where(
                    eq(messages.issueId, input.issueId)
                )
                .orderBy(asc(messages.createdAt));
            return msgs;
        }),

    updateMessageStatus: protectedProcedure
        .input(z.object({
            messageId: z.string(),
            status: z.enum(["sent", "delivered", "seen"])
        }))
        .mutation(async ({ input }) => {
            const updatedMessage = await db
                .update(messages)
                .set({ status: input.status })
                .where(eq(messages.id, input.messageId))
                .returning();
            return updatedMessage;
        }),

    // getUnreadStatus: protectedProcedure
    //     .input(z.object({
    //         issueId: z.string(),
    //         role: z.enum(["citizen", "authority"])
    //     }))
    //     .query(async ({ input }) => {
    //         const unreadMessages = await db
    //             .select()
    //             .from(messages)
    //             .where(
    //                 and(
    //                     eq(messages.issueId, input.issueId),
    //                     ne(messages.status, "seen"),
    //                     ne(messages.role, input.role)
    //                 )
    //             );
    //         return unreadMessages.length > 0;
    //     }
    //     ),

    getUnreadIssues: protectedProcedure
        .input(z.object({
            role: z.enum(["citizen", "authority"])
        }))
        .query(async ({ input }) => {
            const unreadMessages = await db
                .select({ issueId: messages.issueId })
                .from(messages)
                .where(
                    and(
                        ne(messages.status, "seen"),
                        ne(messages.role, input.role)
                    )
                )
                .groupBy(messages.issueId);
            return unreadMessages.map(m => m.issueId);
        }
        ),
})