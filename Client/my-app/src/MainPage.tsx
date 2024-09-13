import React from 'react';
import "./MainPage.css";
import Sliders from './Components/Sliders/Sliders';
import Downloads from './Components/Downloads/Downloads';
import Images from './Components/Images/Images';

const MainPage = () => {

  return (
    <div className='MainPage'>
        <div  className='MainPage_Upload_preview_Download_Binder'>
           <Images/>
         <div className='MainPage_Download_Binder'>
            <Downloads/>
         </div>
        </div>
        <div className='MainPage_Brightness_Saturation_Contrast_Rotate_Deg_Binder'>
        <div className='MainPage_Brightness_Saturation_Contrast_Rotate_Deg'>
            <Sliders/>
        </div>
        </div>
    </div>
  )
}

export default MainPage