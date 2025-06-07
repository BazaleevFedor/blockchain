import express from "express";
import dotenv from "dotenv";
import { verifyTask } from "./verifier";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/verify", async (req, res) => {
    const { task, answer } = req.body;
    try {
        const result = await verifyTask(task, answer);
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Verification failed" });
    }
});

const PORT = process.env.BACKEND_PORT || 8000;
app.listen(PORT, () => {
    console.log(`Backend running at http://localhost:${PORT}`);
});
