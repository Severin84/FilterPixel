import { Area } from 'react-easy-crop';

export interface settings{
    brightnesslevel:string;
    setBrightnesslevel: React.Dispatch<React.SetStateAction<string>>;
    saturation:string;
    setSaturation:React.Dispatch<React.SetStateAction<string>>;
    contrast:string;
    setContrast:React.Dispatch<React.SetStateAction<string>>;
    rotationDeg:string;
    setRotationDeg:React.Dispatch<React.SetStateAction<string>>;
    filename:string;
    setFilename:React.Dispatch<React.SetStateAction<string>>;
    applyChanges:boolean;
    setApplychanges:React.Dispatch<React.SetStateAction<boolean>>;
    selectImage:string|null;
    setSelectedImage:React.Dispatch<React.SetStateAction<string|null>>;
    rawfile:string|Blob;
    setRawfile:React.Dispatch<React.SetStateAction<string|Blob>>;
    responseImage:string|null;
    setResponseImage:React.Dispatch<React.SetStateAction<string|null>>;
    selectedformat:string
    setSelectedformat:React.Dispatch<React.SetStateAction<string>>;
    applyCrop:boolean;
    setApplycrop:React.Dispatch<React.SetStateAction<boolean>>;
    croppedArea:Area|null;
    setCroppedArea:React.Dispatch<React.SetStateAction<Area|null>>;
}

