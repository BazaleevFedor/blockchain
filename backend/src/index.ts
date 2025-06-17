import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { OpenAI } from 'openai';

import { ethers } from 'ethers';
import contractAbi from './SkillToken.json';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 8000;
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

const needMockApi = false;

/** генерация задания */
app.get('/get-task', async (req, res) => {
    if (needMockApi) {
        res.json({ task: 'test task' });

        return;
    }

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
    if (needMockApi) {
        res.json({ result: 90 });

        return;
    }

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

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY!;
const RPC_URL = process.env.RPC_URL || 'http://127.0.0.1:8545';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);
const contract = new ethers.Contract(CONTRACT_ADDRESS, contractAbi.abi, wallet);

app.post('/reward-user', async (req, res) => {
    const { userAddress, amount } = req.body;

    if (!ethers.isAddress(userAddress) || !amount) {
        res.status(400).json({ error: 'Invalid address or amount' });
        return;
    }

    try {
        const tx = await contract.rewardUser(userAddress, amount);
        await tx.wait();

        res.json({ success: true, txHash: tx.hash });
    } catch (err: any) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend запущен на http://localhost:${PORT}`);
});
