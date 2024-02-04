import mysql from 'mysql2'

const db = mysql.createConnection({
    user: 'root',
    host: '127.0.0.1',
    password: '1234',
    database: 'cms'
  });
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  export {db as DB}