import { Request, Response } from "express";
import fs from 'fs';
import path from "path";

const deletallFilesInFolder=()=>{
    const fileuploads=path.join(__dirname,'../../../uploads');

    fs.readdir(fileuploads,(error,files)=>{
        if(error){
             console.log("something when wrong while reading the folder",error);
             return ;
        }
        files.forEach((file)=>{
             const filepath=path.join(fileuploads,file);

             fs.unlink(filepath,error=>{
                if(error){
                    console.log('Error in deleting the files',filepath,error)
                }else{
                    console.log("files deleted",filepath)
                }
             })
        })
    })
}

const getImage=(req:Request,res:Response)=>{
    try{
        const deleteInterval=24*60*60*1000;

        setInterval(()=>{
            deletallFilesInFolder();
        },deleteInterval);

        res.json({message:"Image Uploade"})
    }catch(error){
        res.status(400).json({message:"Something went wrong while uploading the file"})
    }
}

export default getImage;