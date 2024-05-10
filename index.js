const server = require('./src/server');
const { conn } = require('./src/db.js');
const addCountriesBDD = require('./src/controllers/addCountriesBDD.js');
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      addCountriesBDD();
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
