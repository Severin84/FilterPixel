import express , {Request,Response} from "express";
import upload from "../src/routes/fileUpload/fileUpload"
import bodyParser from "body-parser";
import cors from "cors"
const app=express();
const port=8000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());
app.use("/api/upload",upload);

app.listen(port,()=>{
    console.log(`sever is running on ${port}`)
})