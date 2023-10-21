const User = require('../models/user');
const users = []; // Simpan data users di sini

class UserRepository {
  getAllUsers() {
    return users;
  }

  getUserById(id) {
    return users.find((user) => user.id === id);
  }

  createUser(user) {
    users.push(user);
  }

  updateUser(id, updatedUser) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = updatedUser;
    }
  }

  deleteUser(id) {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
    }
  }
}

module.exports = new UserRepository();
