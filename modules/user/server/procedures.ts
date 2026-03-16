import { db } from "@/db";
import { user } from "@/db/schema";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { eq } from "drizzle-orm";
import z from "zod";

export const userRouter = createTRPCRouter({
    getUserById: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input }) => {
            const userData = await db
                .select()
                .from(user)
                .where(eq(user.id, input.id))
            return userData;
        }),
})