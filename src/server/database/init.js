require("dotenv").config();

const connectDb = require("./connection");

const db = connectDb();

const dropTables = "DROP TABLE IF EXISTS person;";

const createPersonTable =
  "CREATE TABLE IF NOT EXISTS person (" +
  "id SERIAL," +
  "email varchar UNIQUE NOT NULL," +
  "password varchar NOT NULL," +
  "is_admin boolean," +
  "PRIMARY KEY (id))";
const setIsAdminDefault =
  "ALTER TABLE person ALTER COLUMN is_admin SET DEFAULT false;";

(async () => {
  // Drop everything
  await db.query(dropTables);

  // Person
  await db.query(createPersonTable);
  await db.query(setIsAdminDefault);

  process.exit();
})();
