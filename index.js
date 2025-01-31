const server = require('./src/server');
const { conn } = require('./src/db.js');
const addCountriesBDD = require('./src/controllers/addCountriesBDD.js');
const PORT = process.env.PORT || 3001;

// conn
//   .sync({ force: true })
//   .then(() => {
//     addCountriesBDD();
//     server.listen(PORT, () => {
//       console.log(`Server listening on port ${PORT}`);
//     });
//   })
//   .catch((error) => console.error(error));

const startServer = async () => {
  try {
    await conn.sync({ force: false }); //! true borra
    await addCountriesBDD();
    server.listen(PORT, () => console.log(`Server raised in port: ${PORT}`));
  } catch (error) {
    console.log('Server not started', error.message);
  }
};

startServer();

// {
//   "version": 2,
//   "builds": [
//     {
//       "src": "./index.js",
//       "use": "@vercel/node"
//     }
//   ],

//   "routes": [
//     {
//       "src": "/(.*)",
//       "dest": "/"
//     }
//   ]
// }