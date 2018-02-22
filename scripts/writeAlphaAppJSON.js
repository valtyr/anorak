const fs = require('fs');
const beautify = require('json-beautify');

const config = require('../app-default');
const alpha = require('../alpha-overrides');

const newFile = {
  ...config,
  expo: {
    ...config.expo,
    ...alpha,
  },
};

fs.writeFile('./app.json', beautify(newFile, null, 2, 80), function(err) {
  if (err) {
    return console.log(err);
  }

  console.log('\x1b[43m\x1b[37m You are now using an alpha app.json 🅰️  \x1b[0m');
});
