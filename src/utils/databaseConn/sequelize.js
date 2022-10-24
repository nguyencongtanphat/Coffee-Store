const {Sequelize} = require('sequelize')
require("dotenv").config();

//CONNECT
// const sequelize = new Sequelize(
//   process.env.DATABASENAME,
//   process.env.USERNAME,
//   process.env.DATABASEPASS,
//   {
//     host: process.env.DATABASEHOST,
//     dialect: "mysql",
//     define: {
//       freezeTableName: true,
//     },
//   }
// );

// const sequelize = new Sequelize('coffee', 'root', null , {
//     host: 'localhost',
//     dialect: 'mysql',
//     define:{
//       freezeTableName: true
//     }
// });

const sequelize = new Sequelize('coffee-store', 'admin_db', 'dbpassword@1', {
  host: 'core-banking-db.mysql.database.azure.com',
  dialect: 'mysql',
  define:{
    freezeTableName: true
  },
  ssl: 'ca:fs.readFileSync("{ca-cert filename}")'
});

// const sequelize = new Sequelize(
//   process.env.DBNAME,
//   process.env.DBUSERNAME,
//   process.env.DBPASSWORD,
//   {
//     host: process.env.DBHOST,
//     port: process.env.DBPORT,
//     dialect: "mysql",
//     define: {
//       freezeTableName: true,
//     },
//   }
// );

module.exports = sequelize