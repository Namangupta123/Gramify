import express from 'express';
import  cors from 'cors';
import dotenv from 'dotenv';
import { ChatMistralAI } from "@langchain/mistralai";
import { PromptTemplate } from "@langchain/core/prompts";

dotenv.config();

const app = express();
app.use(cors({
    origin: ['chrome-extension://*', 'http://localhost:*', '*'],
    methods: ['POST'],
    credentials: true
}));
app.use(express.json());

try {
    const model = new ChatMistralAI({
        apiKey: process.env.MISTRAL_API_KEY,
        model: "mistral-large-latest",
        temperature: 0.7
    });

    const template = `You are a professional grammar correction assistant. 
    Fix any grammar mistakes in the following text while preserving its original meaning.
    Only return the corrected text without any explanations or additional comments.

    Text: {text}`;

    const promptTemplate = PromptTemplate.fromTemplate(template);

    app.post('/fix-grammer', async (req, res) => {
        try {
            const  text  = req.body.text;
            if (!text) {
                return res.status(400).json({ error: 'No text Provided' });
            }
            const formattedPrompt = await promptTemplate.format({ text });
            const response = await model.invoke(formattedPrompt);
            res.json({ correctedText: response.content });

        } 
        catch (error) {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });

    app.get('/', (req, res) => {
        res.json({ status: 'ok' });
    });

    app.listen(3000, () => {
        console.log(`server running on ${3000}`);
    });
} 
catch (error) {
    console.error('Error starting server:', error);
}