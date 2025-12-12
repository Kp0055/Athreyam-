// utils/multerConfig.ts
import multer from "multer";
import path from "path";
import fs from "fs";

// ✅ Save to /backend/uploads
const uploadPath = path.resolve(__dirname, "../../uploads"); // not ../uploads

// ✅ Ensure the folder exists
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage });
