const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
const rateLimit = require("express-rate-limit");
const pool = require('./db');

/*
pool.query('SELECT * FROM user_account', (err, res) => {
    console.log(err, res)
    pool.end()
});
*/

/*
async function test() {
    let res = await pool.query(`
    INSERT INTO post (id_user, title, content, image_url, created_on, likes, usersLiked)
    VALUES (2, 'Super post', 'My content', 'http://sdfsfd.com', CURRENT_TIMESTAMP, 0, '{}')
    `);
    console.log(res);
}
test();
*/

// Express middleware to automatically parse JSON contained in the body
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Creating a limiter by calling rateLimit function with options:
// max contains the maximum number of request and windowMs 
// Time in millisecond so only max amount of 
// request can be made in windowMS time.
const limiter = rateLimit({
  max: 10,
  windowMs: 1000,
  message: "Too many request from this IP"
});

app.use(limiter);
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

module.exports = app;