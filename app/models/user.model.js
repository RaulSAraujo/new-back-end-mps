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

  return user;
};