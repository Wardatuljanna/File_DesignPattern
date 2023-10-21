const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const multer = require('multer'); 
const upload = multer({ dest: 'upload/' });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Mengatur Express untuk melayani file statis dari folder "upload"
app.use('/upload', express.static('upload'));
  
// Menangani permintaan POST untuk mengunggah gambar
app.post('/upload', upload.single('photo'), (req, res) => {
  if (req.file) {
    // Jika unggahan berhasil, req.file akan berisi informasi gambar yang diunggah
    res.json({ message: 'Foto berhasil diunggah', photoPath: req.file.filename });
  } else {
    // Jika unggahan gagal
    res.status(400).json({ error: 'Gagal mengunggah foto' });
  }
});

app.use(bodyParser.json());
app.use('/api', movieRoutes);
app.use('/api', userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
