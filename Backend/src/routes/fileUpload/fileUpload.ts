import express from "express";
import upload from "../../controllers/fileUpload/fileupload";
import getImage from "../../controllers/fileUpload/fileUploadcontroller";
import {ChangeTo} from "../../controllers/ImageConfigure/ImageFormatChange";
import {applyCrop, ChangeImageTone} from "../../controllers/ImageConfigure/ImagetoneChange";

const router=express.Router();

router.post("/image",upload.single('file'),getImage);
router.post("/changeto",ChangeTo);
// router.post("/changetoPNG",ChangeToPNG);
router.post("/changeimagetone",ChangeImageTone);
router.post("/applyCrop",applyCrop)

export default router