const express = require('express');
const MovieController = require('../controllers/movieController');
const router = express.Router();
const upload = require('../middleware/multer'); 

router.get('/movies', MovieController.getAllMovies);
router.get('/movies/:id', MovieController.getMovieById);
router.post('/movies', MovieController.createMovie);
router.put('/movies/:id', MovieController.updateMovie);
router.delete('/movies/:id', MovieController.deleteMovie);

// Endpoint untuk mengunggah gambar ke data movies
router.post('/movies/upload/:movieId', upload.single('photo'), MovieController.uploadPhoto);

module.exports = router;
