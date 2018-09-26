const {Api, Project, FormData, User} = require('xdl');
const appRoot = require('app-root-path');
const ora = require('ora');

const VERSION = 2;

const checkUser = async () => {
  const spinner = ora('Validating expo session').start();
  const user = await User.getCurrentUserAsync();
  if (user.username !== 'anorak') {
    const errorMessage = `You're logged into expo as ${
      user.username
    }. Please log in as anorak.`;
    spinner.fail(errorMessage);
    throw Error(errorMessage);
  }
  spinner.succeed("You're logged in as anorak 🤠");
};

const fetchReleases = async () => {
  const spinner = ora('Fetching list of newest releases').start();
  let formData = new FormData();
  formData.append('queryType', 'history');
  formData.append('slug', await Project.getSlugAsync(appRoot.toString()));
  formData.append('version', VERSION);
  formData.append('count', 50);
  try {
    const {queryResult} = await Api.callMethodAsync(
      'publishInfo',
      [],
      'post',
      null,
      {
        formData
      }
    );
    spinner.succeed('Release list fetched');
    return queryResult;
  } catch (e) {
    spinner.fail(e);
    throw e;
  }
};

module.exports = async () => {
  await checkUser();
  return await fetchReleases();
};
