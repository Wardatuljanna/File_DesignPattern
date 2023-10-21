const MovieRepository = require('../repositories/movieRepository');
const db = require('../config/db'); 
const Movie = require('../models/movie');

class MovieController {
  async getAllMovies(req, res) {
    try {
      const query = 'SELECT * FROM movies';
      const { rows } = await db.query(query);
      res.render('movie', { movies: rows }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getMovieById(req, res) {
    try {
      const movieId = parseInt(req.params.id);
      const query = 'SELECT * FROM movies WHERE id = $1';
      const { rows } = await db.query(query, [movieId]);

      if (rows.length === 1) {
        const movieData = rows[0];
        const movie = new Movie(movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo);
        res.render('movie', { movies: rows }); 
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
      const { id,title, genres, year, photo } = req.body;
      const query = 'INSERT INTO movies (id, title, genres, year, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [id, title, genres, year, photo];
      const { rows } = await db.query(query, values);

      if (rows.length === 1) {
        const movieData = rows[0];
        const newMovie = new Movie(movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo);
        res.json(newMovie);
      } else {
        res.status(500).json({ error: 'Failed to create a new movie' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateMovie(req, res) {
    try {
      const movieId = parseInt(req.params.id);
      const { title, genres, year, photo } = req.body;
      const query = 'UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *';
      const values = [title, genres, year, photo, movieId];
      const { rows } = await db.query(query, values);

      if (rows.length === 1) {
        const movieData = rows[0];
        const updatedMovie = new Movie(movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo);
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
      const query = 'DELETE FROM movies WHERE id = $1';
      const result = await db.query(query, [movieId]);

      if (result.rowCount === 1) {
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
      const query = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING *';
      const values = [photoPath, movieId];
      const { rows } = await db.query(query, values);
  
      if (rows.length === 1) {
        const movieData = rows[0];
        const updatedMovie = new Movie(movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo);
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
