import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

/** генерация задания */
app.get('/get-task', async (req, res) => {
    const type = req.query.type || 'frontend';
    const prompt = `
        Придумай очень простое практическое задание для разработчика на тему "${type}".
        Задание должно быть маленьким, чтобы его можно было сделать примерно за 10-15 минут.
        Дай только сам текст задания, без объяснений и дополнительной информации.
    `;

    try {
        const chat = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        });

        res.json({ task: chat.choices[0].message.content });
    } catch (err: any) {
        console.error(err);
        res.status(err.status).json({ error: err.message });
    }
});

/** проверка решения */
app.post('/verify-task', async (req, res) => {
    const { task, solution } = req.body;
    const prompt = `
        Вот задание:
        "${task}"
        
        Вот решение пользователя:
        ${solution}
        
        Оцени выполнение этого задания по шкале от 0 до 100 баллов.
        Отвечай ТОЛЬКО числом — баллом оценки, без каких-либо объяснений или других слов.
        Если в коде есть явные ошибки, сильно занижай баллы.
    `;

    try {
        const chat = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: prompt }]
        });

        res.json({ result: chat.choices[0].message.content });
    } catch (err: any) {
        console.error(err);
        res.status(err.status).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`✅ Backend запущен на http://localhost:${PORT}`);
});
