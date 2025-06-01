import mysql from "mysql2/promise";

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "Integrador",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});