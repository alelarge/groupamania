CREATE TABLE comment(
    id serial primary key,
    id_post INT NOT NULL,
    id_user INT NOT NULL,
    content TEXT,
    created_on TIMESTAMP NOT NULL,
    CONSTRAINT fk_id_post_c
        FOREIGN KEY (id_post)
        REFERENCES post(id) ON DELETE CASCADE,
    CONSTRAINT fk_id_user_c
        FOREIGN KEY (id_user)
        REFERENCES user_account(id) ON DELETE SET NULL
)