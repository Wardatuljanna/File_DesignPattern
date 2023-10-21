const UserRepository = require('../repositories/userRepository');
const db = require('../config/db');
const User = require('../models/user');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      res.render('user', { users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const user = await UserRepository.getUserById(userId);

      if (user) {
        res.render('user', { users: [user] });
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
      const newUser = await UserRepository.createUser(id, email, gender, password, role);
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const { email, gender, password, role } = req.body;
      const updatedUser = await UserRepository.updateUser(userId, email, gender, password, role);

      if (updatedUser) {
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
      const deleted = await UserRepository.deleteUser(userId);

      if (deleted) {
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
