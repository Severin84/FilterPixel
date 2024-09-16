import { Request, Response } from "express";
import path from "path";
import fs from "fs"
import sharp from "sharp";

const ChangeImageTone=async(req:Request,res:Response)=>{
    try{
      const {filename,brightness,contrast,saturation,rotateDeg}=req.body;

      if(!filename||!brightness || !contrast || !saturation || !rotateDeg){
          return res.send(404).json({message:"all parameter is required"});
      }
      
      
      const inputfilepath=path.resolve(__dirname,"../../../uploads",filename);

      if(!fs.existsSync(inputfilepath)){
            return res.status(404).json({message:"This image does not exits"});
      }

      const imageType=`${filename.split(".")[1]}`;

      const outputfilepath=path.resolve(__dirname,"../../../uploads",`${filename.split(".")[0]}_processed.${imageType}`);
      
      if(imageType==='jpeg'||imageType==='jpg'){
        sharp(inputfilepath)
        .jpeg({quality:80})
        .modulate({
         brightness:parseInt(brightness),
         saturation:parseInt(saturation)
        })
        .rotate(parseInt(rotateDeg))
        .linear(parseInt(contrast))
        .toFile(outputfilepath)
        .then(()=>{
         res.status(200).sendFile(outputfilepath);
        })
        .catch((error)=>{
          res.status(400).json({message:"Some error occured toning the image"})
        })
      }else if(imageType==='png'){
         sharp(inputfilepath)
        .png({quality:80,compressionLevel:6})
        .modulate({
         brightness:parseInt(brightness),
         saturation:parseInt(saturation)
        })
        .rotate(parseInt(rotateDeg))
        .linear(parseInt(contrast))
        .toFile(outputfilepath)
        .then(()=>{
         res.status(200).sendFile(outputfilepath);
        })
        .catch((error)=>{
          res.status(400).json({message:"Some error occured toning the image"})
        })
      }else{
         return res.status(400).json({message:"Only JPEG and PNG images accepted"})
      }
      

    }catch(error){
        res.status(400).json({message:error})
    }
}

const applyCrop=(req:Request,res:Response)=>{
  try{
    const {filename,left,top,Cheight,Cwidth}=req.body
   
    if(!filename||!left||!top||!Cheight||!Cwidth){
      return res.status(400).json({message:"insufficient Data"});
    }
    
    const inputImage=path.resolve(__dirname,"../../../uploads",filename);
   
    if(!fs.existsSync(inputImage)){
      return res.status(404).json({message:"This image does not exits"});
    }
    
    const imageType=`${filename.split(".")[1]}`;
    
    const outputfilepath=path.resolve(__dirname,"../../../uploads",`${filename.split(".")[0]}_processed.${imageType}`);
   
    if(imageType==='jpeg'||imageType==='jpg'){
       sharp(inputImage)
       .jpeg({quality:80})
       .extract({left:left,top:top,width:Cwidth,height:Cheight})
       .toFile(outputfilepath)
       .then(()=>{
         return res.status(200).sendFile(outputfilepath);
       })
       .catch((error)=>{
         return res.status(400).json({message:error})
       })
    }else if(imageType==='png'){
       sharp(inputImage)
       .png({quality:80,compressionLevel:6})
       .extract({left:left,top:top,width:Cwidth,height:Cheight})
       .toFile(outputfilepath)
       .then(()=>{
        return res.status(200).sendFile(outputfilepath);
       })
      .catch((error)=>{
        return res.status(400).json({message:error})
      })
    }else{
       return res.status(400).json({message:"Only JPEG and PNG images accepted"})
    }
   
  }catch(error){
      return res.status(400).json({message:error})
  }
}

export{
  ChangeImageTone,
  applyCrop
};