module.exports = {
  HOST: "localhost", // Replace it with your own host address
  USER: "postgres", // Replace with your own username
  PASSWORD: "1234", // Replace with your own password
  DB: "touchstone",
  dialect: "postgres",
  pool: {
    max: 32,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
