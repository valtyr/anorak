const request = require('sync-request');
const ora = require('ora');

const {logError, getSecrets} = require('./util');

const loginToExpo = (username, password) => {
  const spinner = ora('Logging in to expo.io').start();
  var res = request('POST', 'https://expo.io/--/api/v2/auth/loginAsync', {
    json: {
      username,
      password,
      audience: 'https://exp.host',
      scope: 'openid profile email id',
      client_id: 'sjmmXpszOO8Ks2luJUGiJfkv4rd0HOfR',
      grant_type: 'password',
    },
  });
  if (res.statusCode !== 200) {
    logError('Something went wrong. Dump below.');
    console.log(res.body.toString('utf8'));
    process.exit();
  }
  spinner.succeed();
  var data = JSON.parse(res.getBody('utf8'));
  return data.data.sessionSecret;
};

module.exports = () => {
  const secrets = getSecrets();
  return loginToExpo(secrets.EXPO_USERNAME, secrets.EXPO_PASSWORD);
};
