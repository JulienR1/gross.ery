import cors from "cors";
import express from "express";
import routes from "./routes";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(routes());
app.listen(port, () => console.log(`Listening on port ${port}.`));
