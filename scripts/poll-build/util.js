const fs = require('fs');
const path = require('path');
const temp = require('temp');
const request = require('request');
const ora = require('ora');
const notifier = require('node-notifier');

temp.track();

const flags = process.argv.filter(arg => arg.startsWith('--'));
const platform = flags.includes('--ios') ? 'IOS' : 'ANDROID';

const logError = error => console.log(`Whoops! \x1b[31;4m${error}\x1b[0m`);

const getSecrets = () => {
  const projectRoot = path.join(__dirname, '../../');
  const secretsPath = path.join(projectRoot, '.secrets.json');
  const secretsFileExists = fs.existsSync(secretsPath);
  if (!secretsFileExists) {
    logError(
      'Please create a .secrets.json file in the project root with the values EXPO_USERNAME, EXPO_PASSWORD, ITUNES_CONNECT_ACCOUNT and ITUNES_CONNECT_PASSWORD',
    );
    process.exit();
  }
  return require('../../.secrets.json');
};

const downloadBinary = url =>
  new Promise(async resolve => {
    const spinner = ora('Downloading binary').start();

    const tmpFile = temp.createWriteStream({suffix: platform === 'IOS' ? '.ipa' : '.apk'});
    const dlReq = request({
      method: 'GET',
      uri: url,
    });

    let contentLength = 1;
    let downloadedLength = 0;
    dlReq.on('response', resp => {
      contentLength = resp.headers['content-length'];
    });
    dlReq.pipe(tmpFile);
    tmpFile.on('finish', () => {
      spinner.succeed();
      resolve(tmpFile.path);
    });

    dlReq.on('data', chunk => {
      downloadedLength += chunk.length;
      spinner.text = `Downloading binary (${Math.round(downloadedLength / contentLength * 100)}%)`;
    });
  });

const notify = message => {
  notifier.notify({
    title: 'takumi-client',
    message: message,
    sound: true,
  });
};

module.exports = {
  logError,
  getSecrets,
  downloadBinary,
  notify,
};
