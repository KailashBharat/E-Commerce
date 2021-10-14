require("dotenv").config()
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DBUSER,
  host: "localhost",
  database: process.env.DB,
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT,
});

module.exports = {
  query: async (text, values) => {
    return await pool.query(text, values);
  }, 
  pool
};
