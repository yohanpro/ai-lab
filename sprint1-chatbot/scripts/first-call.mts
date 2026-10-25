import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic(); // .env.local의 ANTHROPIC_API_KEY를 자동으로 읽음

const res = await client.beta.messages.create({
  model: "claude-opus-5-5",
  max_tokens: 16000,
  betas: ["server-side-fallback-2026-07-01"],
  fallbacks: "default", // 안전 분류기가 거절하면 다른 모델로 자동 재시도
  messages: [
    {
      role: "user",
      content: "프론트엔드 개발자가 AI를 배울 때 가장 유리한 점 3가지를 알려줘",
    },
  ],
});

for (const block of res.content) {
  if (block.type === "text") console.log(block.text);
}
console.log(
  "content 블록 종류:",
  res.content.map((b) => b.type),
);
console.log("stop_reason:", res.stop_reason);
console.log("토큰 사용량:", res.usage); // input_tokens = 질문, output_tokens = 답변(사고 포함)
