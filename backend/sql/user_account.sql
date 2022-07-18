CREATE TABLE user_account (
   id serial PRIMARY KEY,
   password VARCHAR(255) NOT NULL,
   email VARCHAR ( 255 ) UNIQUE NOT NULL,
   is_admin BOOLEAN DEFAULT false,
   is_active BOOLEAN DEFAULT true,
   lastname VARCHAR(100) NOT NULL,
   firstname VARCHAR(100) NOT NULL,
   created_on TIMESTAMP NOT NULL,
   last_login TIMESTAMP
);