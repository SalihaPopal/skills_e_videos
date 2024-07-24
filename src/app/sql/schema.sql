-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  profile_img VARCHAR(255) DEFAULT NULL,
  subscribers INTEGER DEFAULT 0,
  account_creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Videos table
CREATE TABLE videos (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  video_url VARCHAR(255) NOT NULL UNIQUE,
  video_img_url VARCHAR(255) NOT NULL,
  video_desc VARCHAR(500),
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  views INTEGER DEFAULT 0,
  tags VARCHAR(255),
  likes INTEGER DEFAULT 0,
  dislikes INTEGER DEFAULT 0,
  uploading_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  video_id INTEGER NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  comment_text TEXT NOT NULL,
  comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscriber_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (user_id, subscriber_id)
);


