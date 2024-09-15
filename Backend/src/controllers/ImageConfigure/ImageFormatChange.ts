import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs"

const ChangeTo=(req:Request,res:Response)=>{
    try{
        const {filename,convertto,brightness,contrast,saturation,rotateDeg}=req.body
        
        if(!filename){
            return res.status(400).json({message:"No file Uploaded"})
        }
       
        if(filename?.split(".")[1]==="jpeg"||filename?.split(".")[1]==="jpg"){
           return  res.status(201).json({message:"Image is already in JPG or JPEG"});
        }

        const imagePath=path.join(__dirname,'../../../uploads',filename);
        
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({message:"This image does not exits"});
        }

        const outputImagePath=path.join(__dirname,'../../../uploads',`${filename}_processed.jpeg`);

        sharp(imagePath)
        .modulate({
                brightness: parseInt(brightness),
                saturation: parseInt(saturation)
        })
        .linear(parseInt(contrast)) 
        .rotate(parseInt(rotateDeg))
        .toFormat('jpeg')
        .toFile(outputImagePath)
        .then(()=>{
            res.status(200).sendFile(outputImagePath);
        })
        .catch(()=>{
            res.status(400).json({message:"somthing went wrong while preparing the download"})
        })

    }catch(error){
       res.status(400).json({message:"Somthing went wrong while converting the image type to JPEG"})
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


export {ChangeTo}