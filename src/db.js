require('dotenv').config();
const { Sequelize } = require('sequelize');

const fs = require('fs');
const path = require('path');
const { DB_SUPABASE } = process.env;

const countries = require('./models/Country');
const activities = require('./models/Activities');

const sequelize = new Sequelize(DB_SUPABASE, { dialect: 'postgres', logging: false });

// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false,
//   native: false
// });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

countries(sequelize);
activities(sequelize);

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: 'country_activity', timestamps: false });
Activity.belongsToMany(Country, { through: 'country_activity', timestamps: false });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize // para importart la conexión { conn } = require('./db.js');
};
