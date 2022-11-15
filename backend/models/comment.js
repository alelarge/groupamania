const pool = require('../db');

 exports.create = async (comment) => {
    let res = await pool.query(`
        INSERT INTO comment (id_user, id_post, content, created_on)
        VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
        `, 
        [comment.userId, comment.postId, comment.content]
    );
}

exports.getOnePost = async (commentId) => {
    let res = await pool.query(`SELECT * FROM comment WHERE id = $1`, 
    [postId,commentId]);
    
    return res.rows[0];
};

exports.getAllPost = async () => {
    let res = await pool.query(`SELECT * FROM post`);
    
    return res.rows;
};

exports.findOne = async (id) => {
    let res = await pool.query(`SELECT * FROM comment WHERE id = $1`,
    [id]);
    
    return res.rows[0];
};

exports.updateOne = async (comment) => {
    let res = await pool.query(`
        UPDATE post SET content =$1, WHERE id=$2 `, 
    [comment.content, comment.id, post.id]);
};

exports.deleteOne = async (commentId) => {
    let res = await pool.query(`
        DELETE FROM post WHERE id = $1;
         `, 
    [postId,commentId]);
};

exports.addLike = async (commentId, userId, postId) => {
    let res = await pool.query(`
        UPDATE post SET likes = likes+1, usersliked = array_append(usersliked, $1)  WHERE id = $2`,
    [commentId,userId, postId]);
}

exports.removeLike = async (commentId, postId, userId) => {
    let res = await pool.query(`
        UPDATE post SET likes = likes -1, usersliked = array_remove(usersliked, $1)  WHERE id = $2`,
    [userId, postId]);
}