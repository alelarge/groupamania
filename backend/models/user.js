const pool = require('../db');

exports.create = async (user) => {
    let res = await pool.query(
        `INSERT INTO user_account (email, password, lastname, firstname, is_admin, is_active, created_on, last_login)
        VALUES ($1, $2, $3, $4, False, False, NOW(), NULL)`, 
        [user.email, user.password, user.lastname, user.firstname]
    );
}

exports.findOne = async (email) => {
    let res = await pool.query(`SELECT * FROM user_account WHERE email = $1`, [email]);
    return res.rows[0];
}

exports.findOneById = async (id) => {
    let res = await pool.query(`SELECT * FROM user_account WHERE id = $1`, [id]);
    return res.rows[0];
}
