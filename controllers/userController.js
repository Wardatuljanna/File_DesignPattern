const UserRepository = require('../repositories/userRepository');
const db = require('../config/db'); 
const User = require('../models/user');

class UserController {
  async getAllUsers(req, res) {
    try {
      const query = 'SELECT * FROM users';
      const { rows } = await db.query(query);
      res.render('user', { users: rows }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const query = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(query, [userId]);

      if (rows.length === 1) {
        const userData = rows[0];
        const user = new User(userData.id, userData.email, userData.gender, userData.password, userData.role);
        res.render('user', { users: rows }); 
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async createUser(req, res) {
    try {
      const { id, email, gender, password, role } = req.body;
      const query = 'INSERT INTO users (id, email, gender, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [id, email, gender, password, role];
      const { rows } = await db.query(query, values);

      if (rows.length === 1) {
        const userData = rows[0];
        const newUser = new User(userData.id, userData.email, userData.gender, userData.password, userData.role);
        res.json(newUser);
      } else {
        res.status(500).json({ error: 'Failed to create a new user' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const { email, gender, password, role } = req.body;
      const query = 'UPDATE users SET email = $1, gender = $2, password = $3, role = $4 WHERE id = $5 RETURNING *';
      const values = [email, gender, password, role, userId];
      const { rows } = await db.query(query, values);

      if (rows.length === 1) {
        const userData = rows[0];
        const updatedUser = new User(userData.id, userData.email, userData.gender, userData.password, userData.role);
        res.json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const query = 'DELETE FROM users WHERE id = $1';
      const result = await db.query(query, [userId]);

      if (result.rowCount === 1) {
        res.json({ message: 'User deleted successfully' });
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();

