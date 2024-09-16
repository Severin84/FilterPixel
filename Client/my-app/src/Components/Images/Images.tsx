import React, { useState } from 'react'
import "./Images.css"
import { useContextProvider } from '../../Context/Context';
import { ImageConfigure } from '../../hooks/ImageConfigure';

import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop';

const Images = () => {
  
  const {setFilename,selectImage,setSelectedImage,setRawfile,responseImage,applyCrop,croppedArea,setCroppedArea,imageCord,setImageCord,setIsCroped}=useContextProvider();
  
  const {uploadImage}=ImageConfigure()
  const [crop,setCrop]=useState({x:0.1,y:0.1});
  const [zoom,setZoom]=useState(1);
  // const [imageCord,setImageCord]=useState({x:0,y:0,width:0,height:0})

  const handleUploadfile=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const image=event.target.files?.[0];
        if(image){
           setFilename(image?.name);
           setSelectedImage(URL.createObjectURL(image));
           setRawfile(image);
           
           const reader=new FileReader();
           reader.onload=function(e:ProgressEvent<FileReader>){
              const img=new Image();

              img.onload=function(){
                 const width=img.width;
                 const height=img.height;

                 setImageCord({x:0.1,y:height,width:width,height:height})
              }
              img.src=e.target?.result as string
           }
          reader.readAsDataURL(image)
        }
  }

  const onCropComplete=(_:Area,croppedAreaPixels:Area)=>{
      setIsCroped(true);
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
                        <Cropper  image={selectImage} crop={crop} zoom={zoom} aspect={1/1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete}/>
                  </div>
                )
              :
              <img className='UploadedImage' src={selectImage}  alt="got_image"/>
          }
        </div>
        <div className='selectimageandupload'>
            <div className='UploadNewImageDiv'>
            <label htmlFor="UploadNewImageButton" className='custom_file_upload'>1.Select Image</label>
            <input type='file' accept='image/*' id="UploadNewImageButton" className='UploadNewImageButton' onChange={(e)=>{handleUploadfile(e)}}/>
            </div>
            <div>
              <button className='Upload' onClick={()=>uploadImage()}>2.Save Image</button>
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