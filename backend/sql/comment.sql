CREATE TABLE comment(
    id serial primary key,
    id_post INT NOT NULL,
    id_user INT NOT NULL,
    content TEXT,
    created_on DESC TIMESTAMP NOT NULL,
    CONSTRAINT fk_id_post_c
        FOREIGN KEY (id_post)
        REFERENCES posts(id_post) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_c
        FOREIGN KEY (id_user)
        REFERENCES users(id_user) ON DELETE SET NULL
)