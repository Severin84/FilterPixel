import React, { useState } from 'react'
import "./Slider.css"
const Sliders = () => {
    const [brightnesslevel,setBrightnesslevel]=useState<string>('0');
    const [saturation,setSaturation]=useState<string>('0');
    const [contrast,setContrast]=useState<string>('0');
    const [rotationDeg,setRotationDeg]=useState<string>('0');

  return (
    <div>
    <div className='Image_Brightness'>
        <input defaultValue={0} type='range' className='BrightnessRange' min="-100" max="100" onChange={(val)=>setBrightnesslevel(val.target.value)}/>
        <output className='bubble'>{`Brightness : ${brightnesslevel}`}</output>
    </div>
    <div className='Image_Saturation'>
        <input defaultValue={0} type='range' className='BrightnessRange' min="-100" max="100" onChange={(val)=>setSaturation(val.target.value)}/>
        <output className='bubble'>{`Saturation : ${saturation}`}</output>
    </div>
    <div className='Image_Contrast'>
        <input defaultValue={0} type='range' className='BrightnessRange' min="-100" max="100" onChange={(val)=>setContrast(val.target.value)}/>
        <output className='bubble'>{`Contrast : ${contrast}`}</output>
    </div>
    <div className='Image_Rotate_Deg'>
        <input defaultValue={0} type='range' className='BrightnessRange' min="-100" max="100" onChange={(val)=>setRotationDeg(val.target.value)}/>
        <output className='bubble'>{`Rotation : ${rotationDeg}`}</output>
    </div>
    </div>
  )
}

export default Sliders