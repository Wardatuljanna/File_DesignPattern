const MovieRepository = require('../repositories/movieRepository');
const db = require('../config/db');
const Movie = require('../models/movie');

class MovieController {
  async getAllMovies(req, res) {
    try {
      const movies = await MovieRepository.getAllMovies();
      res.render('movie', { movies });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getMovieById(req, res) {
    try {
      const movieId = parseInt(req.params.id);
      const movie = await MovieRepository.getMovieById(movieId);

      if (movie) {
        res.render('movie', { movies: [movie] });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createMovie(req, res) {
    try {
      const { id, title, genres, year, photo } = req.body;
      const newMovie = await MovieRepository.createMovie(id, title, genres, year, photo);
      res.json(newMovie);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateMovie(req, res) {
    try {
      const movieId = parseInt(req.params.id);
      const { title, genres, year, photo } = req.body;
      const updatedMovie = await MovieRepository.updateMovie(movieId, title, genres, year, photo);

      if (updatedMovie) {
        res.json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteMovie(req, res) {
    try {
      const movieId = parseInt(req.params.id);
      const deleted = await MovieRepository.deleteMovie(movieId);

      if (deleted) {
        res.json({ message: 'Movie deleted successfully' });
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async uploadPhoto(req, res) {
    try {
      const movieId = parseInt(req.params.movieId);

      if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
      }

      const photoPath = req.file.filename;
      const updatedMovie = await MovieRepository.uploadPhoto(movieId, photoPath);

      if (updatedMovie) {
        res.json(updatedMovie);
      } else {
        res.status(404).json({ error: 'Movie not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new MovieController();
