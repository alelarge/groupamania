const pool = require('../db');

 exports.create = async (post) => {
    let res = await pool.query(`
        INSERT INTO post (id_user, title, content, image_url, created_on, likes, usersLiked)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 0, '{}')
        `, 
        [post.userId, post.title, post.content, post.image_url]
    );
}

exports.getOnePost = async (postId) => {
    let res = await pool.query(`SELECT * FROM post WHERE id = $1`, 
    [postId]);
    
    return res.rows[0];
};

exports.getAllPost = async () => {
    let res = await pool.query(`SELECT * FROM post ORDER BY created_on DESC`);
    
    return res.rows;
};

exports.findOne = async (id) => {
    let res = await pool.query(`SELECT * FROM post WHERE id = $1`,
    [id]);
    
    return res.rows[0];
};

exports.updateOne = async (post) => {
    let res = await pool.query(`
        UPDATE post SET title = $1, content =$2, image_url=$3  WHERE id=$4 `, 
    [post.title, post.content, post.image_url, post.id]);
};

exports.deleteOne = async (postId) => {
    let res = await pool.query(`
        DELETE FROM post WHERE id = $1;
         `, 
    [postId]);
};

exports.addLike = async (postId, userId) => {
    let res = await pool.query(`
        UPDATE post SET likes = likes+1, usersliked = array_append(usersliked, $1)  WHERE id = $2`,
    [userId, postId]);
}

exports.removeLike = async (postId, userId) => {
    let res = await pool.query(`
        UPDATE post SET likes = likes -1, usersliked = array_remove(usersliked, $1)  WHERE id = $2`,
    [userId, postId]);
}