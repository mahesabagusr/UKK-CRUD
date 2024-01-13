import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/routes.js"
import sequelize from "./src/config/db.js";
config({ path: '.env' })

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // or '*' for any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
});
app.use(cookieParser())
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(router);

sequelize.authenticate()
  .then(() => {
    console.log('Successfully Connect to Dev Database')

  })
  .catch((err) => { console.error('Failed to connect to the database:', err); })

const port = process.env.EXPRESS_PORT;

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});


