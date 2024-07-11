// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'nodejsbase',
// });
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejsbase',
})




export default pool;