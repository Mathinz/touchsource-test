const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    first: {
      type: Sequelize.STRING,
    },
    last: {
      type: Sequelize.STRING,
    }
  });
  return User;
};
