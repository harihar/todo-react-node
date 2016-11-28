CREATE TABLE todos
(
    id bigserial NOT NULL PRIMARY KEY,
    title text NOT NULL,
    is_done boolean NOT NULL DEFAULT false
)
