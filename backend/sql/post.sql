CREATE TABLE post(
    id serial primary key,
    id_user INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    image_url VARCHAR(255),
    created_on DESC TIMESTAMP NOT NULL,
    likes INT NOT NULL,
    usersLiked INT[],
    CONSTRAINT fk_id_user_post
        FOREIGN KEY (id_user)
        REFERENCES user_account(id) ON DELETE CASCADE
);

ALTER TABLE post DROP COLUMN dislikes;
ALTER TABLE post DROP COLUMN usersDisliked;