import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
})

export async function analyzeIssue(images: string[], describe_issue: string) {

    const imageParts = await Promise.all(
        images.map(async (url) => {
            const res = await fetch(url)
            const buffer = await res.arrayBuffer()
            const mimeType = res.headers.get("content-type") || "image/jpeg"
            return {
                inlineData: {
                    mimeType: mimeType,
                    data: Buffer.from(buffer).toString("base64")
                }
            }
        })
    )

    const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
            {
                text: `You are an AI civic issue verification system.

You will receive:
- Multiple images of a civic issue
- A user description

Your tasks:

1. Verify whether the issue described is clearly visible in the images.
2. Generate a short and clear title (max 8 words).
3. Assign a priority score between 0 and 100.

Priority scoring rules:

100 → Immediate danger to life (exposed electricity, fire, flooding, accidents)

80–95 → Severe infrastructure damage causing accidents (deep potholes, collapsed road)

60–79 → Serious public inconvenience (large garbage piles, drainage overflow)

40–59 → Moderate issues affecting daily life

20–39 → Minor civic problems

0–19 → Issue barely visible or not serious

Important rules:

- Base your decision primarily on visual evidence and description.
- If the issue is NOT valid, clearly mention a short reason (max 10 words).
- Keep all outputs concise and structured.
- Be strict: if issue is unclear, mark it as invalid.

Return ONLY valid JSON in this format:

{
  "isIssueValid": boolean,
  "title": string,
  "priority_score": number,
  "invalid_reason": string
}

Rules for fields:
- "invalid_reason" should be empty ("") if isIssueValid = true
- "invalid_reason" must be a short reason if isIssueValid = false

User description:
${describe_issue}
` ,
            },
            ...imageParts
        ]
    })
    return result.text
}


export async function checkDuplicateWithAI(
    newIssue: {
        title: string;
        description: string;
        images: string[];
        address: string;
    },
    existingIssue: {
        title: string;
        description: string;
        images: string[];
        address: string;
    }
) {
    try {
        // 🔹 Convert BOTH issue images to base64
        const newImageParts = await Promise.all(
            newIssue.images.map(async (url) => {
                const res = await fetch(url);
                const buffer = await res.arrayBuffer();
                const mimeType = res.headers.get("content-type") || "image/jpeg";

                return {
                    inlineData: {
                        mimeType,
                        data: Buffer.from(buffer).toString("base64"),
                    },
                };
            })
        );

        const existingImageParts = await Promise.all(
            existingIssue.images.map(async (url) => {
                const res = await fetch(url);
                const buffer = await res.arrayBuffer();
                const mimeType = res.headers.get("content-type") || "image/jpeg";

                return {
                    inlineData: {
                        mimeType,
                        data: Buffer.from(buffer).toString("base64"),
                    },
                };
            })
        );

        const result = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: [
                {
                    text: `You are an expert civic issue duplicate detection system.

You will receive:
- Issue 1 (text + images)
- Issue 2 (text + images)

Your task is to determine whether BOTH reports describe the SAME real-world issue.

Focus on:
- Physical location similarity (address context)
- Visual similarity in images (same object/problem)
- Nature of the issue (same type and same instance)

STRICT RULES:

1. Return TRUE only if:
   - Both issues refer to the SAME physical problem
   - AND appear to be from the SAME or VERY NEARBY location
   - AND images show the SAME object/scene or clearly same issue

2. Return FALSE if:
   - Images show different scenes/objects
   - Location appears different
   - Same type of issue but different instance (e.g., different potholes)
   - Descriptions are similar but refer to different real-world problems
   - You are unsure

3. Do NOT guess. Be conservative.
4. Prefer FALSE over incorrect TRUE.

Return ONLY valid JSON:

{
  "isDuplicate": boolean
}

--- ISSUE 1 ---
Title: ${newIssue.title}
Description: ${newIssue.description}
Address: ${newIssue.address}

--- ISSUE 2 ---
Title: ${existingIssue.title}
Description: ${existingIssue.description}
Address: ${existingIssue.address}
`,
                },

                // 🔥 attach images after text
                ...newImageParts,
                ...existingImageParts,
            ],
        });

        const text = result.text?.trim();
        const cleaned = text?.replace(/^\s*```json\s*/, "").replace(/\s*```\s*$/, "");
        const parsed = JSON.parse(cleaned || "{}");
        return parsed.isDuplicate;
    } catch (err) {
        console.error("Duplicate AI Error:", err);
        return false;
    }
}