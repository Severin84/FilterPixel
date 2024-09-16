import React, { useCallback} from 'react'
import { useContextProvider } from '../Context/Context'
import axios from 'axios';

export const ImageConfigure = () => {
    const {brightnesslevel,contrast,saturation,rotationDeg,filename,rawfile,setResponseImage,croppedArea,isDownload,setIsDownload,isCroped}=useContextProvider();
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
                 {
                     headers:{
                         "Content-Type":"application/json"
                     },
                      responseType:"arraybuffer"
                 }
             ).then((resposegot)=>{
                 const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                 const imageUrl=URL.createObjectURL(blob);
                 setResponseImage(imageUrl);
             })
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

    const handleApplyCrop=async()=>{
         try{
            const response=await axios.post("http://localhost:8000/api/upload/applyCrop",
                {   
                    filename:filename,
                    left:croppedArea?.x,
                    top:croppedArea?.y,
                    Cheight:croppedArea?.height,
                    Cwidth:croppedArea?.width,
                },{
                    headers:{
                        "Content-Type":"application/json"
                    },
                     responseType:"arraybuffer"
                }
            ).then((resposegot)=>{
                const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                const imageUrl=URL.createObjectURL(blob);
                setResponseImage(imageUrl);
            })
         }catch(error){
            console.log(error);
         }
    }

    const downloadImageJPEG=async()=>{
        try{
            if(isCroped===true){
                const response=await axios.post("http://localhost:8000/api/upload/changetoJPEG",
                    {
                        filename:filename,
                        left:croppedArea?.x,
                        top:croppedArea?.y,
                        Cheight:croppedArea?.height,
                        Cwidth:croppedArea?.width,
                        downloadstatus:isDownload,
                        croppedStatus:isCroped,
                    },{
                        headers:{
                            "Content-Type":"application/json"
                        },
                         responseType:"arraybuffer"
                    }
                ).then((resposegot)=>{
                    if(isDownload===true){
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href=imageUrl;
                        const onlyFilename=filename.split(".")[0];
                        if(onlyFilename && onlyFilename.length){
                            a.download=onlyFilename;
                        }
                        document.body.appendChild(a);
                        a.click();
                    }else{
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        setResponseImage(imageUrl);
                    }
                }).catch((error)=>{
                    console.log(error)
                }).finally(()=>{
                   setIsDownload(false)
                })

            }else{
                const response=await axios.post("http://localhost:8000/api/upload/changetoJPEG",
                    {
                        filename:filename,
                        brightness:brightnesslevel,
                        contrast:contrast,
                        saturation:saturation,
                        rotateDeg:rotationDeg,
                        downloadstatus:isDownload,
                        croppedStatus:isCroped,
                    },{
                        headers:{
                            "Content-Type":"application/json"
                        },
                         responseType:"arraybuffer"
                    }
                ).then((resposegot)=>{
                    if(isDownload===true){
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href=imageUrl;
                        const onlyFilename=filename.split(".")[0];
                        if(onlyFilename && onlyFilename.length){
                            a.download=onlyFilename;
                        }
                        document.body.appendChild(a);
                        a.click();
                    }else{
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        setResponseImage(imageUrl);
                    }
                }).catch((error)=>{
                    console.log(error)
                }).finally(()=>{
                    setIsDownload(false)
                })
            }
        }catch(error){
             console.log(error)
        }
    }

    const downloadImagePNG=async()=>{
        try{
            if(isCroped===true){
                const response=await axios.post("http://localhost:8000/api/upload/changetoPNG",
                    {
                        filename:filename,
                        left:croppedArea?.x,
                        top:croppedArea?.y,
                        Cheight:croppedArea?.height,
                        Cwidth:croppedArea?.width,
                        downloadstatus:isDownload,
                        croppedStatus:isCroped,
                    },{
                        headers:{
                            "Content-Type":"application/json"
                        },
                         responseType:"arraybuffer"
                    }
                ).then((resposegot)=>{
                    if(isDownload===true){
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href=imageUrl;
                        const onlyFilename=filename.split(".")[0];
                        if(onlyFilename && onlyFilename.length){
                            a.download=onlyFilename;
                        }
                        document.body.appendChild(a);
                        a.click();
                    }else{
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        setResponseImage(imageUrl);
                    }
                }).catch((error)=>{
                    console.log(error)
                }).finally(()=>{
                  setIsDownload(false)
                })
            }else{
                const response=await axios.post("http://localhost:8000/api/upload/changetoPNG",
                    {
                        filename:filename,
                        brightness:brightnesslevel,
                        contrast:contrast,
                        saturation:saturation,
                        rotateDeg:rotationDeg,
                        downloadstatus:isDownload,
                        croppedStatus:isCroped,
                    },{
                        headers:{
                            "Content-Type":"application/json"
                        },
                         responseType:"arraybuffer"
                    }
                ).then((resposegot)=>{
                    if(isDownload===true){
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href=imageUrl;
                        const onlyFilename=filename.split(".")[0];
                        if(onlyFilename && onlyFilename.length){
                            a.download=onlyFilename;
                        }
                        document.body.appendChild(a);
                        a.click();
                    }else{
                        const blob=new Blob([resposegot.data],{type:resposegot.headers["content-type"]});
                        const imageUrl=URL.createObjectURL(blob);
                        setResponseImage(imageUrl);
                    }
                }).catch((error)=>{
                    console.log(error)
                }).finally(()=>{
                   setIsDownload(false)
                })
            }
            
        }catch(error){
             console.log(error)
        }
    }
    
    return {uploadImage,changesetting,downloadImageJPEG,handleApplyCrop,downloadImagePNG};
}
