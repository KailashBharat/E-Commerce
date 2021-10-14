const {pool} = require("../db/connection");


const userTable =  
`CREATE TABLE IF NOT EXISTS "people" (
  "user_id" BIGSERIAL NOT NULL PRIMARY KEY,
  "first_name" VARCHAR(150) NOT NULL,
  "last_name" VARCHAR(150) NOT NULL,
  "password" VARCHAR(75) NOT NULL,
  "age" INT NOT NULL,
  "email" VARCHAR(250) UNIQUE
);`


const createUserTable = async () => {
  try {
    await pool.query(userTable);
  } catch (error) {
    console.log(error);
  }
};


createUserTable();