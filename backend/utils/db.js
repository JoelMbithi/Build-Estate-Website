import pkg from "pg"

import "dotenv/config"

const { Client } = pkg;

const db = new Client({
    user: process.env.DB_USER,
    host:process.env.DB_Host,
    database:process.env.DB_NAME,
    password:process.env.DB_PASS,
    port: process.env.DB_PORT, 
})

db.connect()
  .then(() => console.log('PostgreSQL Connected'))
  .catch((err) => console.error('Connection error', err.stack));

export default db