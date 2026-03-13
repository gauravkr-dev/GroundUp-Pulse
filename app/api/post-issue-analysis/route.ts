import { analyzeIssue } from "@/lib/post-issue-analysis-brain";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { describe_issue, images, latitude, longitude, address, category } = await req.json();

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

    const department = getDepartment(category);

    // AI Analysis

    const response = await analyzeIssue(images, describe_issue);
    const cleanedResponse = response?.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");
    const aiResponse = JSON.parse(cleanedResponse!);

    return NextResponse.json({
        response: aiResponse,
        department: department,
    });

}