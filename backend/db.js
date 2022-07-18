const { Pool, Client } = require('pg');

// Connection PG
const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const pool = new Pool(config);

//
// const pool = new Sequelize('postgres', 'postgres', 'root', {
//   host: '172.17.0.2',
//   dialect: 'postgres'
// });

// async function test() {
//   let [results, metadata] = await pool.query('SELECT * FROM user_account');
//   console.log('results', results);
// }
// test();

module.exports = pool;