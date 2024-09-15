import React, { useCallback} from 'react'
import { useContextProvider } from '../Context/Context'
import axios from 'axios';

export const ImageConfigure = () => {
    const {brightnesslevel,contrast,saturation,rotationDeg,filename,rawfile,setResponseImage}=useContextProvider();

         const changesetting=useCallback(async()=>{
            try{
               const response = await axios.post(`http://localhost:8000/api/upload/changeimagetone`,
                 {   
                     filename:filename,
                     brightness:brightnesslevel,
                     contrast:contrast,
                     saturation:saturation,
                     rotateDeg:rotationDeg
                 },
                //  {
                //      headers:{
                //          "Content-Type":"application/json"
                //      }
                //  }
                {
                    responseType:"arraybuffer"
                }
             ).then((resposegot)=>{
                 const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});

                 const imageUrl=URL.createObjectURL(blob);
                 setResponseImage(imageUrl);
             })

             console.log(response)
            }catch(error){
               console.log(error);
            }

         },[filename,brightnesslevel,contrast,saturation,rotationDeg]);
         

    const uploadImage=async()=>{
        try{
            if(rawfile){
                const formData=new FormData();
                formData.append("file",rawfile);
                const response=await axios.post(`http://localhost:8000/api/upload/image`,formData,
                    {
                        headers:{
                            "Content-Type":"multipart/form-data"
                        }
                    }
                )
            }
        }catch(error){
            console.log("error")
        }
    } 

    return {uploadImage,changesetting};
}
