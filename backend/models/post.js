const pool = require('../db');

 exports.create = async (post) => {
    let res = await pool.query(`
        INSERT INTO post (id_user, title, content, image_url, created_on, likes, usersLiked)
        VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, 0, '{}')
        `, 
        [post.userId, post.title, post.content, post.imageUrl]
    );
}

    exports.modify = async (post) => {
    console.log('post', post);

        let res = pool.query(`
            UPDATE post SET id = id.user WHERE id = $1 AND id.user = $2
            `, 
        []);
    };

