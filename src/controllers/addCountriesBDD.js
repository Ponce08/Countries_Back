const axios = require('axios');
require('dotenv').config();
const { END_POINT } = process.env;
const { Country } = require('../db');

const addCountriesBDD = async () => {
  try {
    const countriesBDD = await Country.findAll();

    if (countriesBDD.length === 0) {
      const { data } = await axios.get(`${END_POINT}`);
      await data.map(async (country) => {
        return await Country.create({
          id: country.cca3,
          name: country.name.common.toLowerCase(),
          flag: country.flags.png,
          continents: country.continents,
          capital: country.capital,
          subregion: country.subregion,
          area: country.area,
          population: country.population
        });
      });
      console.log('information saved in the BD');
      // return res.send('Paises agregados correctamente')
    }
    console.log('Error in the BD');
    // return res.send('Base de datos actualizada')
  } catch (error) {
    console.error(error);
  }
};
module.exports = addCountriesBDD;
