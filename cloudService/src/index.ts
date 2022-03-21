import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";

import { routes, sockets } from "./routes";

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();

const server = createServer(app);
sockets.init(server);

app.use(express.json());
app.use(cors());
app.use(routes());

server.listen(port, () => console.log(`Listening on port ${port}.`));
