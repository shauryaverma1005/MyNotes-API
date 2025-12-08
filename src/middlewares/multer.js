import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer.upload({ storage });

export {upload}