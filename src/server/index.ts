import 'dotenv/config';
import express from "express";
import cors from "cors";
import { openaiHandler } from "./routes/openai";
import { anthropicHandler } from "./routes/anthropic";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/openai", openaiHandler);
app.post("/api/anthropic", anthropicHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`API server on :${port}`));

