import { Request } from "express";
import multer from "multer";
import fs, { mkdirSync } from "fs";
import path from "path";

if(!fs.existsSync("uploads/")){
    fs.mkdirSync("uploads/",{recursive:true})
}

const storage=multer.diskStorage({
    destination:(req:Request,file:Express.Multer.File,cb:(error: Error | null, destination: string)=>void)=>{
        cb(null,"uploads/");
    },
    filename:(req:Request,file:Express.Multer.File,cb:(error: Error | null, destination: string)=>void)=>{
        cb(null,file.originalname)
    },
})

const upload=multer({storage:storage});



export default upload;