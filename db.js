import {Sequelize} from 'sequelize'
import * as dotenv from 'dotenv'
import * as pg from 'pg'
dotenv.config()

const sequelize = new Sequelize(process.env.dburi,{
  logging: false,
  dialectModule: pg.Client
})
try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
export default sequelize