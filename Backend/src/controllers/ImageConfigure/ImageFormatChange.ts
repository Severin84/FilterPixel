import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";

const ChangeToJPEG=(req:Request,res:Response)=>{
    try{
        const filename=req.file?.filename
       
        if(!filename){
            return res.status(400).json({message:"No file Uploaded"})
        }

        if(filename?.split(".")[1]==="jpeg"||filename?.split(".")[1]==="jpg"){
           return  res.status(201).json({message:"Image is already in JPG or JPEG"});
        }

        const inputfilepath=path.resolve(__dirname,"../../../uploads",filename)
        const outputfilepath=path.resolve(__dirname,"../../../uploads",`${filename.split(".")[0]}.jpeg`);

        sharp(inputfilepath)
        .toFormat('jpeg',{palette:true})
        .toFile(outputfilepath)
        .then(()=>{
            console.log("File converted")
             res.status(200).sendFile(outputfilepath);
        })
        .catch((error)=>{
             console.log(error);
             res.status(400).json({message:"Some error occured while converting file to JPEG"})
        })

    }catch(error){
       res.send(400).json({message:"Somthing went wrong while converting the image type to JPEG"})
    }
}

const ChangeToPNG=(req:Request,res:Response)=>{
    try{
        const filename=req.file?.filename
       
        if(!filename){
            return res.status(400).json({message:"No file Uploaded"})
        }

        if(filename?.split(".")[1]==="png"){
           return  res.status(401).json({message:"Image is already in PNG"});
        }

        const inputfilepath=path.resolve(__dirname,"../../../uploads",filename)
        const outputfilepath=path.resolve(__dirname,"../../../uploads",`${filename.split(".")[0]}.png`);

        sharp(inputfilepath)
        .toFormat('png',{palette:true})
        .toFile(outputfilepath)
        .then(()=>{
             res.status(200).sendFile(outputfilepath);
        })
        .catch((error)=>{
             res.status(400).json({message:"Some error occured while converting file to PNG"})
        })

    }catch(error){
       res.send(400).json({message:"Somthing went wrong while converting the image type to PNG"})
    }
}


export {ChangeToJPEG,ChangeToPNG}