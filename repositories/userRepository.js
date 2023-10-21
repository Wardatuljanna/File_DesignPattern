const db = require('../config/db');
const Movie = require('../models/user');

class UserRepository {
  async getAllUsers() {
    const query = 'SELECT * FROM users';
    const { rows } = await db.query(query);
    return rows;
  }

  async getUserById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await db.query(query, [id]);
    return rows[0];
  }

  async createUser(id, email, gender, password, role) {
    const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [id, email, gender, password, role];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async updateUser(id, email, gender, password, role) {
    const query = 'UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *';
    const values = [email, gender, password, role, id];
    const { rows } = await db.query(query, values);
    return rows[0];
  }

  async deleteUser(id) {
    const query = 'DELETE FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rowCount === 1;
  }
}

module.exports = new UserRepository();
