import React from 'react'
import "./Slider.css"
import { useContextProvider } from '../../Context/Context'
import { ImageConfigure } from '../../hooks/ImageConfigure';

const Sliders = () => {
   const {brightnesslevel,setBrightnesslevel,saturation,setSaturation,contrast,setContrast,rotationDeg,setRotationDeg,applyCrop,setApplycrop}=useContextProvider();
   const {changesetting,handleApplyCrop}=ImageConfigure()
   
   const handleStartCrop=()=>{
      setApplycrop(!applyCrop);
   }
   
   
  return (
    <div>
        <div className='slider_buttons'>
            <div>
                <button className='Apply_Tuning' onClick={()=>changesetting()}>Apply Tuning</button>
            </div>
            <div>
                <button className='Start_Cropping' onClick={()=>handleStartCrop()}>Start Cropping</button>
                <button className='Save_Cropped_Image' onClick={()=>handleApplyCrop()}>Save Cropped Image</button>
            </div>
        </div>
    <div className='Image_Brightness'>
        <input defaultValue={1} type='range' className='BrightnessRange' min="1" max="100" onChange={(val)=>setBrightnesslevel(val.target.value)}/>
        <output className='bubble'>{`Brightness : ${brightnesslevel}`}</output>
    </div>
    <div className='Image_Saturation'>
        <input defaultValue={1} type='range' className='BrightnessRange' min="1" max="100" onChange={(val)=>setSaturation(val.target.value)}/>
        <output className='bubble'>{`Saturation : ${saturation}`}</output>
    </div>
    <div className='Image_Contrast'>
        <input defaultValue={1} type='range' className='BrightnessRange' min="1" max="100" onChange={(val)=>setContrast(val.target.value)}/>
        <output className='bubble'>{`Contrast : ${contrast}`}</output>
    </div>
    <div className='Image_Rotate_Deg'>
        <input defaultValue={0} type='range' className='BrightnessRange' min="0" max="360" onChange={(val)=>setRotationDeg(val.target.value)}/>
        <output className='bubble'>{`Rotation : ${rotationDeg}`}</output>
    </div>
    </div>
  )
}

export default Sliders