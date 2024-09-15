import React from 'react'
import "./Images.css"
import { useContextProvider } from '../../Context/Context';
import { ImageConfigure } from '../../hooks/ImageConfigure';
const Images = () => {
  const {setFilename,selectImage,setSelectedImage,setRawfile,responseImage}=useContextProvider();
  // const [rawfile,setRawfile]=useState<File|null>(null);
  const {uploadImage}=ImageConfigure()
  const handleUploadfile=(event: React.ChangeEvent<HTMLInputElement>)=>{
        const image=event.target.files?.[0];
        if(image){
           setFilename(image?.name);
           setSelectedImage(URL.createObjectURL(image));
           setRawfile(image);
        }
  }
  
  //console.log(responseImage)
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
            <label htmlFor="UploadNewImageButton" className='custom_file_upload'>Select Image</label>
            <input type='file' accept='image/*' id="UploadNewImageButton" className='UploadNewImageButton' onChange={handleUploadfile}/>
            </div>
            <div>
              <button onClick={()=>uploadImage()}>upload</button>
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