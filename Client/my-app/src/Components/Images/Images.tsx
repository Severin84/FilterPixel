import React, { useState } from 'react'
import "./Images.css"
const Images = () => {
  const [selectImage,setSelectedImage]=useState<string|null>(null);

  const handleUploadfile=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const image=event.target.files?.[0]
        if(image){
           setSelectedImage(URL.createObjectURL(image));
        }
  }
  
  return (
    <div className='MainPage_Upload_preview_Binder'>
        <div className='Image_Uploaded'>
          {
            selectImage===null ? 
              <span>Upload An Image</span>
            :
             <img className='UploadedImage' src={selectImage}  alt="got_image"/>
          }
        </div>
          <div className='UploadNewImageDiv'>
            <label htmlFor="UploadNewImageButton" className='custom_file_upload'>Upload Image</label>
            <input type='file' accept='image/*' id="UploadNewImageButton" className='UploadNewImageButton' onChange={handleUploadfile}/></div>
        <div className='Image_preview'>preview</div>
    </div>
  )
}

export default Images