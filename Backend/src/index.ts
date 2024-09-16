import express  from "express";
import upload from "../src/routes/fileUpload/fileUpload"
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app=express();
dotenv.config();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

const port=process.env.PORT;


app.use("/api/upload",upload);

app.listen(port,()=>{
    console.log(`sever is running on ${port}`)
})