const Movie = require('../models/movie');
const movies = []; // Simpan data movies di sini

class MovieRepository {
  getAllMovies() {
    return movies;
  }

  getMovieById(id) {
    return movies.find((movie) => movie.id === id);
  }

  createMovie(movie) {
    movies.push(movie);
  }

  updateMovie(id, updatedMovie) {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
      movies[index] = updatedMovie;
    }
  }

  deleteMovie(id) {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
      movies.splice(index, 1);
    }
  }

  uploadPhoto(id, photoPath) {
    const index = movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
      movies[index].photo = photoPath;
    }
  }
}

module.exports = new MovieRepository();
