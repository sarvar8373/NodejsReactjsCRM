import express, { response } from 'express'
import {DB} from '../utils/db.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, 'uploads/userImg/')
  },
  filename: (req, file, cb)=>{
    cb(null, file.fieldname + "_" +Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage})
const salt =10
router.post('/login', (req, res) => {
  const LogUserName = req.body.username;
  const LogEmail = req.body.email;
  const sql = 'SELECT * FROM users WHERE (username = ? OR email = ?)';
  const values = [LogUserName, LogEmail];
  
  DB.query(sql, values, (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });

    if (result.length > 0) {
      bcrypt.compare(req.body.password.toString(), result[0].password, (err, response) => {
        if (err) {
          return res.json({ Login: false, Error: "Error comparing passwords" });
        }
        
        if (response) {
          const id = result[0].id
          const email = result[0].email;
          const username = result[0].username;
          const name = result[0].name;
          const image = result[0].image;
          const role = result[0].role;
          const token = jwt.sign({
            id: id,
            email: email,
            username: username,
            name: name,
            image: image,
            role: role,
          }, "jwt_secret_key", { expiresIn: "1d" });

          res.cookie('token', token);
          return res.json({ loginStatus: true });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong email or password" });
        }
      });
    } else {
      return res.json({ loginStatus: false, Error: "Wrong email or password" });
    }
  });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token'); // Clear the token cookie
  res.json({ success: true });
});

router.post('/add_user', upload.single('image'), (req, res) => {
  console.log(req.body);
  const password = req.body.password;
  const sql = `INSERT INTO users (username, email, image, name, role, password) VALUES (?, ?, ?, ?, ?, ?)`;
  bcrypt.hash(password.toString(), salt, (err, hash)=>{
    if (err) {
      console.log(err);
    }
      const values = [
        req.body.username,
        req.body.email,
        req.file.filename,
        req.body.name,
        req.body.role,
        hash
    ];

    DB.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Status: false, Error: "Query error" });
        }

        return res.json({ Status: true });
    });
    })
 
});
const veryfyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ Status: false, Message: "Token not provided" });
  } else {
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
      if (err) {
        return res.json({ Status: false, Message: "Authentication error" });
      } else {
        req.id = decoded.id
        req.username = decoded.username;
        req.email = decoded.email;
        req.name = decoded.name;
        req.image = decoded.image;
        req.role = decoded.role;
        next();
      }
    });
  }
};

router.get('/user', veryfyUser, (req, res) => {
  return res.json({
    Status: true,
    username: req.username,
    email: req.email,
    image: req.image,
    name: req.name,
    role: req.role,
    id: req.id
  });
});

router.put('/user/:id', veryfyUser, upload.single('image'), (req, res) => {
  const userID = req.params.id;
  const newUsername = req.body.username;
  const newEmail = req.body.email;
  const newUserImage = req.file ? req.file.filename : '';
  const newName = req.body.name;
  const newPassword = req.body.password;
  const newRole = req.body.role;

  // Hash the new password before updating it in the database
  bcrypt.hash(newPassword, 10, (hashErr, hash) => {
    if (hashErr) {
      console.error(hashErr);
      return res.json({ Status: false, Error: 'Error hashing password' });
    }

    const sql = 'UPDATE users SET username=?, email=?, image=?, name=?, password=?, role=? WHERE id=?';
    const values = [newUsername, newEmail, newUserImage, newName, hash, newRole, userID];

    DB.query(sql, values, (err, result) => {
      if (err) {
        console.error(err);
        return res.json({ Status: false, Error: 'Query error' });
      }

      if (result.affectedRows > 0) {
        return res.json({ Status: true, Message: 'User updated successfully' });
      } else {
        return res.json({ Status: false, Error: 'User not found or not updated' });
      }
    });
  });
});
router.get('/user/:id', (req, res) => {
  const userID = req.params.id;
  const sql = "SELECT * FROM users WHERE id = ?";
  
  DB.query(sql, [userID], (err, result) => {
    if (err) {
      return res.json({ Status: false, Error: "Query error" });
    }

    // Check if a post with the specified ID was found
    if (result.length > 0) {
      return res.json({ Status: true, Result: result[0] }); // Return the first (and only) result
    } else {
      return res.json({ Status: false, Error: "User not found" });
    }
  });
});
router.get('/users', (req, res)=>{
  const sql = "SELECT * FROM users"
  DB.query(sql, (err, result)=>{
      if(err) return res.json({Status: false, Error: "Query error"})
      return res.json({Status: true, Result: result})
  })
})

router.delete('/user/:id', (req, res) => {
    const categoryId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
  
    DB.query(sql, [categoryId], (err, result) => {
      if (err) return res.json({ Status: false, Error: 'Query error' });
  
      if (result.affectedRows > 0) {
        return res.json({ Status: true, Message: 'Category deleted successfully' });
      } else {
        return res.json({ Status: false, Error: 'Category not found or already deleted' });
      }
    });
  });

export {router as AdminRouter}