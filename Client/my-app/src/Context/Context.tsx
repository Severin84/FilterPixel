import React,{createContext,ReactNode,useContext,useState} from "react";
import { settings } from "../types/ComponentsType";
import { Area } from 'react-easy-crop';
const Context=createContext<settings|null>(null);


export const ContextProvider=({children}:{children:ReactNode})=>{

    const [brightnesslevel,setBrightnesslevel]=useState<string>('1');
    const [saturation,setSaturation]=useState<string>('1');
    const [contrast,setContrast]=useState<string>('1');
    const [rotationDeg,setRotationDeg]=useState<string>('0');
    const [filename,setFilename]=useState<string>("");
    const [applyChanges,setApplychanges]=useState<boolean>(false);
    const [selectImage,setSelectedImage]=useState<string|null>(null);
    const [rawfile,setRawfile]=useState<string|Blob>("");
    const [responseImage,setResponseImage]=useState<string|null>(null)
    const [selectedformat,setSelectedformat]=useState<string>("");
    const [applyCrop,setApplycrop]=useState<boolean>(false);
    const [croppedArea,setCroppedArea]=useState<Area|null>(null)

    return (
         <Context.Provider 
         value={{
            brightnesslevel,
            setBrightnesslevel,
            saturation,
            setSaturation,
            contrast,
            setContrast,
            rotationDeg,
            setRotationDeg,
            filename,
            setFilename,
            applyChanges,
            setApplychanges,
            selectImage,
            setSelectedImage,
            rawfile,setRawfile,
            responseImage,
            setResponseImage,
            selectedformat,
            setSelectedformat,
            applyCrop,
            setApplycrop,
            croppedArea,
            setCroppedArea
            }}>
            {children}
         </Context.Provider>
    )
}

export const useContextProvider=():settings=>{
    const context=useContext(Context);

    if(!context){
        throw new Error("Something is wrong with useContextProvider")
    }

    return context;
}