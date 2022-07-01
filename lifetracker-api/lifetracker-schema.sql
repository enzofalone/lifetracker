CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    password    TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL
);

CREATE TABLE nutrition (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    quantity    INTEGER NOT NULL,
    calories    INTEGER NOT NULL,
    image       TEXT NOT NULL,
    user_email  TEXT NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email)
);

CREATE TABLE exercise (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    duration    INTEGER NOT NULL,
    intensity   INTEGER NOT NULL CHECK(intensity > 0 AND intensity < 11),
    user_email  TEXT NOT NULL,
    FOREIGN KEY (user_email) REFERENCES users(email)
);