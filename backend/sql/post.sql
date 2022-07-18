CREATE TABLE post(
    id serial primary key,
    id_user INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    content TEXT,
    image_url VARCHAR(255),
    created_on TIMESTAMP NOT NULL,
    likes INT NOT NULL,
    usersliked INT[],
    CONSTRAINT fk_id_user_post
        FOREIGN KEY (id_user)
        REFERENCES user_account(id) ON DELETE CASCADE
);