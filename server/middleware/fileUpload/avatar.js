import multer from "multer";

var storeImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/avatars");
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf("."));
    let name = file.originalname.substring(0, file.originalname.indexOf("."));
    cb(null, name + "-" + Date.now() + ext);
  },
});

export const storage = multer({
  storage: storeImage,
  fileFilter: function (req, file, cb) {
    if ((file.mimetype = "image/png" || "image/jpg" || "image/jpeg")) {
      cb(null, true);
    } else {
      console.log("Only jpg and Png Supported");
      cb(null, false);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});
