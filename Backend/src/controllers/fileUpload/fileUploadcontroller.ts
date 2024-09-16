import { Request, Response } from "express";

const getImage=(req:Request,res:Response)=>{
    try{
       return res.json({message:"Image Uploade"})
    }catch(error){
        res.status(400).json({message:"Something went wrong while uploading the file"})
    }
}

export default getImage;