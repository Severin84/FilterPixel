import React, { useState } from 'react'
import "./Images.css"
import { useContextProvider } from '../../Context/Context';
import { ImageConfigure } from '../../hooks/ImageConfigure';

import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

const Images = () => {
  
  const {setFilename,selectImage,setSelectedImage,setRawfile,responseImage,applyCrop,croppedArea,setCroppedArea}=useContextProvider();
  
  const {uploadImage}=ImageConfigure()
  const [crop,setCrop]=useState({x:0.1,y:0.1});
  const [zoom,setZoom]=useState(1);
 

  const handleUploadfile=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const image=event.target.files?.[0];
        if(image){
           setFilename(image?.name);
           setSelectedImage(URL.createObjectURL(image));
           setRawfile(image);
        }
  }

  const onCropComplete=(_:Area,croppedAreaPixels:Area)=>{
     setCroppedArea(croppedAreaPixels);
  };

  return (
    <div className='MainPage_Upload_preview_Binder'>
        <div className='Image_Uploaded'>
          {
            selectImage===null ? 
              <span>Upload An Image</span>
            :
              applyCrop===true?
                selectImage &&
                ( 
                  <div className='UploadedImage'>
                        <Cropper   image={selectImage} crop={crop} zoom={zoom} aspect={1/1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}/>
                  </div>
                )
              :
              <img className='UploadedImage' src={selectImage}  alt="got_image"/>
          }
        </div>
        <div className='selectimageandupload'>
            <div className='UploadNewImageDiv'>
            <label htmlFor="UploadNewImageButton" className='custom_file_upload'>Select Image</label>
            <input type='file' accept='image/*' id="UploadNewImageButton" className='UploadNewImageButton' onChange={(e)=>{handleUploadfile(e)}}/>
            </div>
            <div>
              <button className='Upload' onClick={()=>uploadImage()}>Upload Image</button>
            </div>
        </div>
        <div className='Image_preview'>
        {
            responseImage===null ? 
              <span>Preview</span>
            : 
             <img className='UploadedImage' src={responseImage}  alt="got_image"/>
          }
        </div>
    </div>
  )
}

export default Images