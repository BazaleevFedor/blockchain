import { OpenAI } from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
});

export async function verifyTask(task: string, answer: string): Promise<string> {
    const prompt = `Проверь решение задачи "${task}". Ответ: "${answer}". Дай фидбэк и оценку от 1 до 10.`;

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { role: "system", content: "Ты ассистент, который проверяет задания по программированию." },
            { role: "user", content: prompt }
        ]
    });

    return completion.choices[0].message?.content || "Нет ответа от модели.";
}
