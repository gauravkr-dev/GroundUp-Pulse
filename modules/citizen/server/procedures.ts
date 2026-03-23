
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { db } from "@/db";
import { postIssue } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { and, between, count, desc, eq, or, sql } from "drizzle-orm";
import z from "zod";
import { TRPCError } from "@trpc/server";
import { analyzeIssue, checkDuplicateWithAI } from "@/lib/post-issue-analysis-brain";


function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
        Math.sin(Δφ / 2) ** 2 +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // meters
}

async function boostPriority(issueId: string) {
    await db
        .update(postIssue)
        .set({
            priority_score: sql`${postIssue.priority_score}::int + 5`,
        })
        .where(eq(postIssue.id, issueId));
}

function getDepartment(category: string) {
    switch (category) {
        case "water":
            return "Water Supply Department";
        case "road":
            return "Public Works Department (PWD)";

        case "electricity":
            return "Electricity Board";

        case "sanitation":
            return "Municipal Sanitation Department";

        case "traffic":
            return "Traffic Police Department";

        default:
            return "Municipal Corporation";
    }

}

export const postIssueInsertSchema = createInsertSchema(postIssue).omit({
    userId: true,
    title: true,
    department: true,
    priority_score: true,
});

export const postIssueRouter = createTRPCRouter({
    checkAndCreateIssue: protectedProcedure
        .input(postIssueInsertSchema)
        .mutation(async ({ ctx, input }) => {

            const { describe_issue, images, latitude, longitude, category, address } = input;

            // 🔹 STEP 1: AI VALIDATION
            const response = await analyzeIssue(images, describe_issue);
            const cleanedResponse = response?.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");
            const aiResponse = JSON.parse(cleanedResponse!);

            if (aiResponse.isIssueValid === false) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: `Issue validation failed: ${aiResponse.invalid_reason}`,
                });
            }

            // 🔹 STEP 2: FETCH NEARBY ISSUES (DB FILTER)
            const nearbyIssues = await db
                .select()
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.category, category),
                        between(postIssue.latitude, latitude - 0.01, latitude + 0.01),
                        between(postIssue.longitude, longitude - 0.01, longitude + 0.01)
                    )
                );

            // 🔹 STEP 3: CHECK DUPLICATES
            for (const issue of nearbyIssues) {
                const distance = getDistance(
                    latitude,
                    longitude,
                    issue.latitude,
                    issue.longitude
                );

                // ✅ VERY CLOSE → DIRECT DUPLICATE
                if (distance < 50) {
                    await boostPriority(issue.id);

                    return {
                        type: "duplicate",
                        message: "Similar issue already exists nearby.",
                        issueId: issue.id,
                    };
                }

                // ⚖️ MID RANGE → AI CHECK
                if (distance >= 50 && distance <= 500) {
                    const isSame = await checkDuplicateWithAI(
                        { title: aiResponse.title, description: describe_issue, images, address },
                        {
                            title: issue.title,
                            description: issue.describe_issue,
                            images: issue.images,
                            address: issue.address,
                        }
                    );
                    if (isSame) {
                        await boostPriority(issue.id);

                        return {
                            type: "duplicate",
                            message: "Similar issue found (AI matched).",
                            issueId: issue.id,
                        };
                    }
                }
            }

            // 🔹 STEP 4: CREATE NEW ISSUE
            const newIssue = await db.insert(postIssue).values({
                userId: ctx.auth.user.id,
                title: aiResponse.title,
                describe_issue,
                images,
                latitude,
                longitude,
                category,
                address,
                department: getDepartment(category),
                priority_score: String(aiResponse.priority_score),
                emergency: aiResponse.priority_score === 100 ? true : false,
            });

            if (!newIssue) {
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Failed to create issue.",
                });
            }

            return {
                type: "created",
                message: "Issue created successfully.",
                data: newIssue,
            };
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

    getStats: protectedProcedure
        .query(async ({ ctx }) => {
            // Total created issue
            const [created] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(eq(postIssue.userId, ctx.auth.user.id))

            // Total resolved issue
            const [resolved] = await db
                .select({ value: count() })
                .from(postIssue)
                .where(
                    and(
                        eq(postIssue.userId, ctx.auth.user.id),
                        eq(postIssue.status, "resolved")
                    )
                )
            return {
                create_issue_count: created.value,
                resolved_issue_count: resolved.value,
            }
        })
})