const {ApiV2, User, Project} = require('xdl');
const appRoot = require('app-root-path');
const compareVersions = require('compare-versions');
const inquirer = require('inquirer');
const ora = require('ora');
const Table = require('cli-table');

const printReleaseTable = releases => {
  const table = new Table({
    head: ['Platform', 'Publication ID', 'Publication time']
  });
  table.push(['iOS', releases.ios.publicationId, releases.ios.publishedTime]);
  table.push([
    'Android',
    releases.android.publicationId,
    releases.android.publishedTime
  ]);

  console.log(table.toString());
};

const versionCheck = (releases, manifestAppVersion) => {
  const spinner = ora(
    `Making sure ${manifestAppVersion} is the newest version`
  ).start();
  releases.forEach(release => {
    // See if there's already a newer release on the default release channel
    const isPublished = release.channel === 'default';
    const comparison = compareVersions(release.appVersion, manifestAppVersion);
    if (comparison === 1 && isPublished) {
      const errorMessage =
        "There's already a newer release on the 'default' release channel";
      spinner.fail(errorMessage);
      throw Error(errorMessage);
    }
    if (comparison === 0 && isPublished) {
      const errorMessage = `Version ${manifestAppVersion} is already on the 'default' release channel`;
      spinner.fail(errorMessage);
      throw Error(errorMessage);
    }
  });
  spinner.succeed(`${manifestAppVersion} is the newest version`);
};

const isAlpha = release => release.channel === 'alpha';
const isVersion = (release, version) => release.appVersion === version;
const isPlatform = (release, platform) => release.platform === platform;
const assembleFindFunction = (version, platform) => {
  return release =>
    isAlpha(release) &&
    isVersion(release, version) &&
    isPlatform(release, platform);
};

const findPlatformReleases = (releases, version) => {
  const spinner = ora('Finding releases for each platform').start();

  const android = releases.find(assembleFindFunction(version, 'android'));
  const ios = releases.find(assembleFindFunction(version, 'ios'));

  if (!android) {
    const errorMessage = `No Android release found for ${version}.`;
    spinner.fail(errorMessage);
    throw Error(errorMessage);
  }
  if (!ios) {
    const errorMessage = `No iOS release found for ${version}.`;
    spinner.fail(errorMessage);
    throw Error(errorMessage);
  }
  spinner.succeed('Found releases for both iOS and Android');
  return {android, ios};
};

const promoteReleases = async (releases, manifestAppVersion) => {
  const user = await User.getCurrentUserAsync();
  const api = ApiV2.clientForUser(user);

  printReleaseTable(releases);

  const {shouldPromote} = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'shouldPromote',
      message:
        'Are you sure you want to promote these releases to the production client?'
    }
  ]);
  if (shouldPromote) {
    const spinner = ora('Promoting releases to the production client').start();
    try {
      await api.postAsync('publish/set', {
        releaseChannel: 'default',
        publishId: releases.android.publicationId,
        slug: await Project.getSlugAsync(appRoot.toString())
      });
      await api.postAsync('publish/set', {
        releaseChannel: 'default',
        publishId: releases.ios.publicationId,
        slug: await Project.getSlugAsync(appRoot.toString())
      });
    } catch (e) {
      spinner.fail(e);
      throw e;
    }
    spinner.succeed(
      `${manifestAppVersion} now available on production clients!`
    );
  }
};

module.exports = {
  promoteRelease: async releases => {
    const manifest = require(appRoot + '/app.json');
    const manifestAppVersion = manifest.expo.version;

    versionCheck(releases, manifestAppVersion);
    const platformReleases = findPlatformReleases(releases, manifestAppVersion);
    await promoteReleases(platformReleases, manifestAppVersion);
  },
  versionCheck,
  assembleFindFunction,
  findPlatformReleases
};
