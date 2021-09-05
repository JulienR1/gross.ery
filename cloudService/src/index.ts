import cors from "cors";
import express,{Request,Response} from "express";

const port = process.env.PORT || 5000;

const app = express();
app.use(cors());

app.get("/", (req:Request,res:Response)=>{
    res.sendStatus(200);
});

app.listen(port,()=>console.log(`Listening on port ${port}.`));