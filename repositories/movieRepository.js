const db = require('../config/db');
const Movie = require('../models/movie');


class MovieRepository {
  async getAllMovies() {
    const query = 'SELECT * FROM movies';
    const { rows } = await db.query(query);
    return rows;
  }

  async getMovieById(id) {
    const query = 'SELECT * FROM movies WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  async createMovie(id, title, genres, year, photo) {
    const query = 'INSERT INTO movies (id, title, genres, year, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, title, genres, year, photo];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async updateMovie(id, title, genres, year, photo) {
    const query = 'UPDATE movies SET title = $1, genres = $2, year = $3, photo = $4 WHERE id = $5 RETURNING *';
    const values = [title, genres, year, photo, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async deleteMovie(id) {
    const query = 'DELETE FROM movies WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }

  async uploadPhoto(movieId, photoPath) {
    const query = 'UPDATE movies SET photo = $1 WHERE id = $2 RETURNING id, title, genres, year, photo';
    const values = [photoPath, movieId];
    const { rows } = await db.query(query, values);
  
    if (rows.length === 1) {
      const movieData = rows[0];
      return new Movie( movieData.id, movieData.title, movieData.genres, movieData.year, movieData.photo );
    }
    return rows[0];
  }
}

module.exports = new MovieRepository();
