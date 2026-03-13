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

Tasks:
1. Verify whether the issue described is visible in the images.
2. Generate a short title (max 8 words).
3. Assign a priority score between 0 and 100.

Priority scoring rules:

100 → Immediate danger to life (exposed electricity, fire, flooding, accidents)

80–95 → Severe infrastructure damage causing accidents (deep potholes, collapsed road)

60–79 → Serious public inconvenience (large garbage piles, drainage overflow)

40–59 → Moderate issues affecting daily life

20–39 → Minor civic problems

0–19 → Issue barely visible or not serious

Return ONLY JSON:

{
"isIssueValid": boolean,
"title": string,
"priority_score": number
}

User description:
${describe_issue}`
            },
            ...imageParts
        ]
    })
    return result.text
}