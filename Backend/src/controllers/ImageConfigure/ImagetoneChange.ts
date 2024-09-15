import { Request, Response } from "express";
import path from "path";
import fs from "fs"
import sharp from "sharp";

const ChangeImageTone=async(req:Request,res:Response)=>{
    try{
      const {filename,brightness,contrast,saturation,rotateDeg}=req.body;
       console.log(rotateDeg);
       console.log(typeof(rotateDeg))
      if(!filename||!brightness || !contrast || !saturation || !rotateDeg){
          return res.send(404).json({message:"all parameter is required"});
      }
      
      const inputfilepath=path.resolve(__dirname,"../../../uploads",filename);

      if(!fs.existsSync(inputfilepath)){
            return res.status(404).json({message:"This image does not exits"});
      }

      const imageType=`${filename.split(".")[1]}`;

      const outputfilepath=path.resolve(__dirname,"../../../uploads",`processed.${imageType}`);

      await sharp(inputfilepath)
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
      });

    }catch(error){
        res.status(400).json({message:error})
    }
}

export default ChangeImageTone;