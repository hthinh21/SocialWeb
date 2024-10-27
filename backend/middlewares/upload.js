import multer from "multer";

// Cấu hình multer để lưu ảnh vào bộ nhớ dưới dạng buffer
const storage = multer.memoryStorage(); // Lưu ảnh vào bộ nhớ dưới dạng buffer

export const upload = multer({ storage: storage });
