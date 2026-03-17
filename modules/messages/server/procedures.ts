import { db } from "@/db";
import { messages } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq, asc } from "drizzle-orm";
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
})