const bcrypt = require('bcryptjs');
module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    age: {
      type: Sequelize.STRING
    },
    telephone: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.VIRTUAL
    },
    password_hash: {
      type: Sequelize.STRING
    }
  });

  user.addHook('beforeSave', async (user) => {
    if (user.password) {
      user.password_hash = await bcrypt.hash(user.password, 8);
    }
  });

  return user;
};