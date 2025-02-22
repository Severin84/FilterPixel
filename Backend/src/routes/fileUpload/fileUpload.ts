import express from "express";
import upload from "../../controllers/fileUpload/fileupload";
import getImage from "../../controllers/fileUpload/fileUploadcontroller";
import {ChangeToJPEG, ChangeToPNG} from "../../controllers/ImageConfigure/ImageFormatChange";
import {applyCrop, ChangeImageTone} from "../../controllers/ImageConfigure/ImagetoneChange";

const router=express.Router();

router.post("/image",upload.single('file'),getImage);
router.post("/changetoJPEG",ChangeToJPEG);
router.post("/changetoPNG",ChangeToPNG);
router.post("/changeimagetone",ChangeImageTone);
router.post("/applyCrop",applyCrop)

export default router