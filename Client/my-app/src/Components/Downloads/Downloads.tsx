import React, { useState } from 'react'
import "./Downloads.css"
import { ImageConfigure } from '../../hooks/ImageConfigure';
import { useContextProvider } from '../../Context/Context';
const Downloads = () => {
  
  const [showDownloadformat,setShowDownloadformat]=useState<boolean>(false);
  const {setSelectedformat}=useContextProvider();
  const {downloadImageJPEG,downloadImagePNG}=ImageConfigure();

  const handleSelectformatJPEG=(value:string)=>{
      setSelectedformat(value);
      downloadImageJPEG();
  }
  const handleSelectformatPNG=(value:string)=>{
    setSelectedformat(value);
    downloadImagePNG();
}

  return (
    <div>
       <div>
         <button className='DownloadButton' onClick={()=>setShowDownloadformat(!showDownloadformat)}>Download</button>
       </div>
       
       <div style={{transform:showDownloadformat? "translateY(1rem)":"translateY(0rem)",transition:"transform 500ms ease",visibility:showDownloadformat?"visible":"hidden"}} className='format_Div'>
         <div className='format_Binder'>
          <span className='JPEG_format' onClick={()=>handleSelectformatJPEG("jpeg")}>JPEG Format</span>
          <span className='png_format'  onClick={()=>handleSelectformatPNG("png")}>PNG Format</span>
         </div>
       </div>
    </div>
  )
}

export default Downloads