// const Connect_Database = require("../Config/database");
// async function create_table() {
//     try {
//         const query1 = `CREATE TABLE IF NOT EXISTS roles (
//                             id INT AUTO_INCREMENT PRIMARY KEY,
//                             name VARCHAR(50) NOT NULL UNIQUE
//                         );`;
//         const query1_1=`INSERT INTO roles (name)
//                         SELECT 'admin'
//                         WHERE NOT EXISTS (
//                             SELECT 1 FROM roles WHERE name = 'admin'
//                         );`;
//         const query1_2=`INSERT INTO roles (name)
//                         SELECT 'user'
//                         WHERE NOT EXISTS (
//                             SELECT 1 FROM roles WHERE name = 'user'
//                         );`;
//         const query2 = `CREATE TABLE IF NOT EXISTS users (
//                             id INT AUTO_INCREMENT PRIMARY KEY,
//                             username VARCHAR(50) NOT NULL UNIQUE,
//                             password VARCHAR(255) NOT NULL,
//                             email VARCHAR(100) UNIQUE,
//                             role_id INT,
//                             security_password CHAR(255),
//                             token_refresh CHAR(255) UNIQUE,
//                             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                             FOREIGN KEY (role_id) REFERENCES roles(id)
//                         );`;
//         const query3 = `CREATE TABLE IF NOT EXISTS residents (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         name VARCHAR(100) NOT NULL,
//                         dob DATE,
//                         gender ENUM('Male','Female','Other'),
//                         room_number VARCHAR(10),
//                         admission_date DATE,
//                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//                     );`;
//         const query4 = `CREATE TABLE IF NOT EXISTS medications (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         name VARCHAR(100) NOT NULL,
//                         dosage VARCHAR(50),
//                         instructions TEXT
//                     );`;
//         const query5 = `CREATE TABLE IF NOT EXISTS resident_medications (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         resident_id INT,
//                         medication_id INT,
//                         start_date DATE,
//                         end_date DATE,
//                         times_per_day INT,
//                         FOREIGN KEY (resident_id) REFERENCES residents(id),
//                         FOREIGN KEY (medication_id) REFERENCES medications(id)
//                     )`;
//         const query6 = `CREATE TABLE IF NOT EXISTS care_schedule (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         resident_id INT,
//                         staff_id INT,
//                         care_type VARCHAR(100),
//                         scheduled_time DATETIME,
//                         notes TEXT,
//                         FOREIGN KEY (resident_id) REFERENCES residents(id),
//                         FOREIGN KEY (staff_id) REFERENCES users(id)
//                     )`;
//         const query7 = `CREATE TABLE IF NOT EXISTS attendance (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         staff_id INT,
//                         date DATE,
//                         status ENUM('Present','Absent','Leave'),
//                         FOREIGN KEY (staff_id) REFERENCES users(id)
//                     )`;
//         const query8 = `CREATE TABLE IF NOT EXISTS logs (
//                         id INT AUTO_INCREMENT PRIMARY KEY,
//                         user_id INT,
//                         action VARCHAR(255),
//                         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//                         FOREIGN KEY (user_id) REFERENCES users(id)
//                     )`;
//         const conn = await Connect_Database();
//         const list_query = [query1,query1_1,query1_2, query2, query3, query4, query5, query6, query7, query8];
//         for (query of list_query) {
//             await conn.execute(query);
//         }
//         console.log("Tạo bảng thành công.");
//     } catch (e) {
//         console.log(`Tạo bảng thất bại.\nBáo lỗi: ${e}`);
//     }
// }
// module.exports = create_table;