import express from 'express';
import cors from 'cors';
import router from "../routes/route.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/reviews", router);

export default app;