import { Request, Response } from "express";
import sharp from "sharp";
import path from "path";
import fs from "fs"

const ChangeToJPEG=(req:Request,res:Response)=>{
    try{
        const {filename,brightness,contrast,saturation,rotateDeg,left,top,Cheight,Cwidth,downloadstatus,croppedStatus}=req.body;
        if(croppedStatus===true){
            if(!filename||!left||!top||!Cheight||!Cheight){
                return res.status(400).json({message:"Insufficient Data"})
            }
        }else{
            if(!filename||!brightness||!contrast||!saturation||!rotateDeg){
                return res.status(400).json({message:"Insufficient Data"})
            }
        }
       
      
        const imagePath=path.join(__dirname,'../../../uploads',filename);
      
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({message:"This image does not exits"});
        }
       
        const outputImagePath=path.join(__dirname,'../../../uploads',`${filename.split(".")[0]}_processed.jpeg`);

        if(downloadstatus===true){
            if(croppedStatus===true){
                 sharp(imagePath)
                .extract({left:left,top:top,width:Cwidth,height:Cheight})
                .toFormat('jpeg')
                .toFile(outputImagePath)
                .then(()=>{
                   return res.status(200).sendFile(outputImagePath);
                })
                .catch(()=>{
                   return res.status(400).json({message:"somthing went wrong while preparing the download"})
                })
            }else{
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
                   return res.status(200).sendFile(outputImagePath);
                })
                .catch(()=>{
                   return res.status(400).json({message:"somthing went wrong while preparing the download"})
                })
            }
        }else{
            if(croppedStatus===true){
                sharp(imagePath)
                .jpeg({quality:80})
                .extract({left:left,top:top,width:Cwidth,height:Cheight})
                .toFormat('jpeg')
                .toFile(outputImagePath)
                .then(()=>{
                   res.status(200).sendFile(outputImagePath);
                })
                .catch((error)=>{
                  res.status(400).json({message:error})
                })
            }else{
                sharp(imagePath)
                .jpeg({quality:80})
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
                .catch((error)=>{
                  res.status(400).json({message:error})
                })
            }
           
        }
    }catch(error){
       return res.status(400).json({message:"Somthing went wrong while converting the image type to JPEG"})
    }
}

const ChangeToPNG=(req:Request,res:Response)=>{
    try{
     
        const {filename,brightness,contrast,saturation,rotateDeg,left,top,Cheight,Cwidth,downloadstatus,croppedStatus}=req.body
       
        if(croppedStatus===true){
            if(!filename||!left||!top||!Cheight||!Cheight){
                return res.status(400).json({message:"Insufficient Data"})
            }
        }else{
            if(!filename||!brightness||!contrast||!saturation||!rotateDeg){
                return res.status(400).json({message:"Insufficient Data"})
            }
        }
      
        const imagePath=path.join(__dirname,'../../../uploads',filename);

    
        if(!fs.existsSync(imagePath)){
            return res.status(404).json({message:"This image does not exits"});
        }
        const outputImagePath=path.join(__dirname,'../../../uploads',`${filename.split(".")[0]}_processed.png`);

        if(downloadstatus===true){
            if(croppedStatus===true){
                sharp(imagePath)
                .extract({left:left,top:top,width:Cwidth,height:Cheight})
                .toFormat('png')
                .toFile(outputImagePath)
                .then(()=>{
                    return res.status(200).sendFile(outputImagePath);
                })
                .catch((error)=>{
                    return res.status(400).json({message:"Some error occured while converting file to PNG"})
                })
            }else{
                sharp(imagePath)
                .modulate({
                    brightness: parseInt(brightness),
                    saturation: parseInt(saturation)
                })
                .linear(parseInt(contrast)) 
                .rotate(parseInt(rotateDeg))
                .toFormat('png')
                .toFile(outputImagePath)
                .then(()=>{
                    return res.status(200).sendFile(outputImagePath);
                })
                .catch((error)=>{
                    return res.status(400).json({message:"Some error occured while converting file to PNG"})
                })
            }
        }else{
            if(croppedStatus===true){
                sharp(imagePath)
                .png({quality:80,compressionLevel:6})
                .extract({left:left,top:top,width:Cwidth,height:Cheight})
                .toFormat('png')
                .toFile(outputImagePath)
                .then(()=>{
                    return res.status(200).sendFile(outputImagePath);
                })
                .catch((error)=>{
                    return res.status(400).json({message:"Some error occured while converting file to PNG"})
                })
            }else{
                sharp(imagePath)
                .png({quality:80,compressionLevel:6})
                .modulate({
                    brightness: parseInt(brightness),
                    saturation: parseInt(saturation)
                })
                .linear(parseInt(contrast)) 
                .rotate(parseInt(rotateDeg))
                .toFormat('png')
                .toFile(outputImagePath)
                .then(()=>{
                    return res.status(200).sendFile(outputImagePath);
                })
                .catch((error)=>{
                    return res.status(400).json({message:"Some error occured while converting file to PNG"})
                })
            } 
        }
    }catch(error){
       return res.send(400).json({message:"Somthing went wrong while converting the image type to PNG"})
    }
}



export {ChangeToJPEG,ChangeToPNG}