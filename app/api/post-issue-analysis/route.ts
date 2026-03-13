import { analyzeIssue } from "@/lib/post-issue-analysis-brain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { describe_issue, images, latitude, longitude, address, category } = await req.json();
    console.log("Received issue analysis request:", {
        describe_issue,
        images,
        latitude,
        longitude,
        address,
        category
    });

    // AI Analysis

    const response = await analyzeIssue(images, describe_issue);
    const cleanedResponse = response?.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");
    const aiResponse = JSON.parse(cleanedResponse!);

    return NextResponse.json({
        response: aiResponse,
    });

}