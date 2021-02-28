const production = {
  HOST: "localhost",
  USER: "agata",
  PASSWORD: "1234",
  DB: "garden-planner",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

const development = {
  HOST: "localhost",
  USER: "agata",
  PASSWORD: "1234",
  DB: "testdb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}

module.exports = process.env.NODE_ENV === 'production' ? production : development;

