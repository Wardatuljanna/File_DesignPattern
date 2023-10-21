const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk mengunggah gambar
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload/'); // Folder penyimpanan gambar
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

// Inisialisasi multer dengan konfigurasi storage
const upload = multer({ storage });

module.exports = upload;