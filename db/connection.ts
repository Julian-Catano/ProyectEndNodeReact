import { Sequelize } from 'sequelize';


const db = new Sequelize('recetapp', 'app', '12', {
    host: 'localhost',
    dialect:'mssql',
    port: 56842,
})


export default db;

