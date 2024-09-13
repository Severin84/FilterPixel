import React, { useState } from 'react'
import "./Downloads.css"
const Downloads = () => {
  const [showDownloadformat,setShowDownloadformat]=useState<boolean>(false);

  return (
    <div>
       <div>
         <button className='DownloadButton' onClick={()=>setShowDownloadformat(!showDownloadformat)}>Download</button>
       </div>
       
       <div style={{transform:showDownloadformat? "translateY(1rem)":"translateY(0rem)",transition:"transform 500ms ease",visibility:showDownloadformat?"visible":"hidden"}} className='format_Div'>
         <div className='format_Binder'>
          <span className='JPEG_format'>JPEG Format</span>
          <span className='png_format'>PNG Format</span>
         </div>
       </div>
      
    </div>
  )
}

export default Downloads