import { Sequelize } from "sequelize";

import { config } from "dotenv";

config({ path: '.env' })

const sequelize = new Sequelize(
  process.env.MYSQL_DEV,
  process.env.USER,
  process.env.PASSWORD, {
  host: process.env.HOST,
  port: process.env.PORT,
  dialect: 'mysql',
  logging: false
})

export default sequelize