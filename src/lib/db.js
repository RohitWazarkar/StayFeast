//for mysql 

// import mysql from "mysql2/promise";

// export async function connectDB() {
//   const connection = await mysql.createConnection({
//     host: "localhost",     // change if needed
//     user: "root",          // your MySQL username
//     password: "Rohit@123", // your MySQL password
//     database: "nextjs_db",
//   });
//   return connection;
// }


// for ms sql 
import sql from "mssql";
const config = {
  user: "sa",
  password: "Rohit@123",
  server: "localhost",   
  database: "HotelDesk",
  options: {
    encrypt: false,
    trustServerCertificate: true,
  }
};


let pool;
export async function connectDB(){
  try {
    if (!pool) {
      pool = await sql.connect(config);
       console.log("Got Connected !");
    }
    return pool;
  } catch (err) {
    console.error("DB Connection Error:", err);
    throw err;
  }
}
