import pg from "pg";
const { Pool } = pg;

import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

// Configure the database connection
const pool_options = { connectionString: process.env.DATABASE_URL };
const pool = new Pool(pool_options);

const scryptAsync = promisify(scrypt);

let jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePassword(storedPassword, suppliedPassword) {
  try {
    const [hashedPassword, salt] = storedPassword.split(".");
    if (!hashedPassword || !salt) {
      throw new Error("Invalid stored password format");
    }
    const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
    const suppliedPasswordBuf = await scryptAsync(suppliedPassword, salt, 64);
    return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
  } catch (error) {
    console.error("Error comparing passwords", error);
    throw error;
  }
}

export function createToken(username) {
  const token = jwt.sign({ username: username }, secret, {
    expiresIn: 86400, // expires in 24 hours
  });
  return token;
}

export function verifyToken(token) {
  if (!token.startsWith("Bearer ")) {
    throw new Error("no Bearer in header");
  }
  // Remove Bearer from string
  token = token.slice(7, token.length).trimLeft();
  if (!token) {
    throw new Error("no token after Bearer");
  }
  return jwt.verify(token, secret);
}

export async function getUsers() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Error fetching users", error);
    throw new Error("Failed to fetch users");
  }
}

export async function getUser(username) {
  try {
    const result = await pool.query(
      "SELECT id, username, email FROM users WHERE username = $1",
      [username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user", error);
    throw error;
  }
}

export async function AddUser(username, password, email) {
  try {
    const userExists = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );
    if (userExists.rowCount > 0) {
      throw new Error("User already registered");
    }
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      "INSERT INTO users(username, email, password) VALUES($1, $2, $3) RETURNING id",
      [username, email, hashedPassword]
    );
    console.log("Insert successful");
    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to add user", error);
    throw error;
  }
}

export async function Login(username, suppliedPassword) {
  try {
    console.log(`Login for username: ${username}`);
    const userExists = await pool.query(
      "SELECT username, password FROM users WHERE username = $1",
      [username]
    );
    console.log(`User query result: ${JSON.stringify(userExists.rows)}`);

    if (userExists.rowCount === 0) {
      throw new Error("User not found");
    }

    const storedPassword = userExists.rows[0].password;
    console.log(`Stored password for ${username}: ${storedPassword}`);

    const passwordMatch = await comparePassword(
      storedPassword,
      suppliedPassword
    );

    if (!passwordMatch) {
      throw new Error("Password does not match");
    }

    console.log("Logged in successfully");
    return true;
  } catch (error) {
    console.error("Login failed", error);
    throw error;
  }
}

export async function updateUser( username, email, password, profile_img, subscribers) {
  try {
    const hashedPassword = await hashPassword(password);
    const result = await pool.query(
      `UPDATE users
      SET 
        email = $1,
        password = $2,
        profile_img = $3,
        subscribers = $4
      WHERE username = $5
      RETURNING *;`,
      [email, hashedPassword, profile_img, subscribers, username]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating user", error);
    throw error;
  }
}

export async function deleteUser(username) {
  try {
    const result = await pool.query("DELETE FROM users WHERE username=$1", [username]);
    console.log(`User ${username} deleted!`);
    return result;
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
}

export async function getVideos() {
  try {
    const result = await pool.query("SELECT * FROM videos");
    return result.rows;
  } catch (error) {
    console.error("Error fetching videos", error);
    throw new Error("Failed to fetch videos");
  }
}

export async function AddVideo(
  title,
  video_url,
  video_img_url,
  video_desc,
  user_id,
  views,
  tags,
  likes,
  dislikes
) {
  try {
    const videoExists = await pool.query(
      "SELECT video_url FROM videos WHERE title = $1",
      [title]
    );
    if (videoExists.rowCount > 0) {
      throw new Error("Video already exists");
    }

    const result = await pool.query(
      `INSERT INTO videos(title, video_url, video_img_url, video_desc, user_id, views, tags, likes, dislikes)
       VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [title, video_url, video_img_url, video_desc, user_id, views, tags, likes, dislikes]
    );
    console.log("Video added successfully");
    return result.rows[0].id;
  } catch (error) {
    console.error("Failed to add video", error);
    throw error;
  }
}


export async function getVideo(username, searchTitle = '', searchUrl = '') {
  try {
    let query = `
      SELECT videos.title, videos.video_url, videos.video_img_url, videos.video_desc, videos.views, videos.tags, videos.likes, videos.dislikes, videos.uploading_date
      FROM users
      JOIN videos ON videos.user_id = users.id
      WHERE users.username = $1`
    
    // retrieves videos for a specific user  
    const queryParams = [username];
    
    // filter videos by title and add the query to the queryParams
    if (searchTitle) {
      query += ` AND videos.title ILIKE $2`;
      queryParams.push(`%${searchTitle}%`);
    }
    
    // filter videos by url no matter title is added before and add the query to the queryParams
    if (searchUrl) {
      query += searchTitle ? ` AND videos.video_url ILIKE $3` : ` AND videos.video_url ILIKE $2`;
      queryParams.push(`%${searchUrl}%`);
    }
    
    // sorted by the number of views in descending order and add the query to the queryParams
    query += ` ORDER BY videos.views DESC`;
     
    // The query is executing by using pool.query with the constructed query and parameters
    const result = await pool.query(query, queryParams);
    return result.rows;
  } catch (error) {
    console.error("Error fetching videos", error);
    throw error;
  }
}

export async function updateVideo(video_id, fieldsToUpdate) {
  try {
    const setClause = Object.keys(fieldsToUpdate)
      .map((field, index) => `${field} = $${index + 1}`);
    const values = Object.values(fieldsToUpdate);

    const result = await pool.query(
      `UPDATE videos
      SET ${setClause}
      WHERE id = $${values.length + 1}
      RETURNING *;`,
      [...values, video_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating video", error);
    throw error;
  }
}

export async function deleteVideo(video_id, user_id) {
  try {
    const result = await pool.query(`
      DELETE FROM videos WHERE id = $1 AND user_id = $2`, 
      [video_id, user_id]);
    console.log(`Video has been deleted!`);
    return result;
  } catch (error) {
    console.error("Error deleting video", error);
    throw error;
  }
}