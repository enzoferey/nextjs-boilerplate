require("dotenv").config();

const connectDb = require("./connection");
const { hashPassword } = require("../modules/auth/dependencies");

const db = connectDb();

(async () => {
  // Person
  await db.query(
    "INSERT INTO person (email, password, is_admin) VALUES (%L, %L, %L)",
    "admin@admin.com",
    hashPassword("admin"),
    true
  );
  await db.query(
    "INSERT INTO person (email, password, is_admin) VALUES (%L, %L, %L)",
    "user@user.com",
    hashPassword("user"),
    false
  );

  process.exit();
})();
