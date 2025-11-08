import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import generateRouter from "./routes/generate";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/generate", generateRouter);

// Use a different default port than Vite (5173) to avoid conflicts with the dev server.
const port = Number(process.env.PORT || 5174);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on http://localhost:${port}`);
});
