const { defineConfig } = require('cypress');
const mysql = require('mysql');

function queryTestDB(query,config) {
  const connection = mysql.createConnection(config.env.db);
  connection.connect();

  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else {
        connection.end();
        return resolve(results);
      }
    });
  });
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDB: (query) => {
          return queryTestDB(query, config);
        },
      });
    },
    "baseUrl": "http://localhost:4000",
  },
});



