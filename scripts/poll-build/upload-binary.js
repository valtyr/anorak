const ora = require('ora');
const {exec} = require('child_process');
const fs = require('fs');
const os = require('os');

const {getSecrets, logError, notify} = require('./util');

const flags = process.argv.filter(arg => arg.startsWith('--'));
const platform = flags.includes('--ios') ? 'IOS' : 'ANDROID';
const altoolPath =
  '/Applications/Xcode.app/Contents/Applications/Application\\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool';

const uploadBinaryIos = path =>
  new Promise(resolve => {
    const spinner = ora('Uploading binary to iTunes Connect').start();

    // const altoolPathExists = fs.existsSync(altoolPath.replace('\\'));
    // if (!altoolPathExists) {
    //   spinner.fail('You must have Xcode installed to be able to upload a build to iTunes Connect.');
    //   notify('You must have Xcode installed to be able to upload a build to iTunes Connect.');
    //   process.exit();
    // }

    const secrets = getSecrets();
    if (!secrets.ITUNES_CONNECT_ACCOUNT || !secrets.ITUNES_CONNECT_PASSWORD) {
      logError(
        'Make sure you have keys ITUNES_CONNECT_ACCOUNT and ITUNES_CONNECT_PASSWORD in your .secrets.json',
      );
    }
    const command = `${altoolPath} --upload-app -f ${path} -u ${
      secrets.ITUNES_CONNECT_ACCOUNT
    } -p ${secrets.ITUNES_CONNECT_PASSWORD}`;
    const uploadProcess = exec(command);

    let output = '';
    uploadProcess.stderr.on('data', data => {
      output += data;
    });

    uploadProcess.on('close', () => {
      if (output.includes('package(s) were not uploaded because they had problems')) {
        notify(
          'Problems were encountered when uploading to iTunes Connect. See terminal for details.',
        );
        spinner.fail();
      } else {
        notify('Build succeeded!');
        spinner.succeed();
      }

      console.log(
        '\n\n\x1b[2m=========== \x1b[4miTunes Application Loader Output\x1b[24m ===========\x1b[0m',
      );
      console.log(output.split('Package Summary:')[1].trim() || output);
      console.log('\x1b[2m========================================================\x1b[0m');

      resolve();
    });
  });

const uploadBinary = async path => {
  if (platform === 'IOS') {
    return await uploadBinaryIos(path);
  }
  if (platform === 'ANDROID') {
    const spinner = ora('Copying binary to Desktop').start();
    fs.createReadStream(path).pipe(fs.createWriteStream(os.homedir() + '/Desktop/android.apk'));
    spinner.succeed();
    notify('Build succeeded!');
  }
};

module.exports = {
  uploadBinary,
  uploadBinaryIos,
};
