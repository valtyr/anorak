const fs = require('fs');
const beautify = require('json-beautify');

const config = require('../app-default');

fs.writeFile('./app.json', beautify(config, null, 2, 80), function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('\x1b[43m\x1b[37m You are now using an prod app.json ⚓️  \x1b[0m');
});
