const graphql = require('graphql-request');
const ora = require('ora');

const getSession = require('./exp-login');
const {logError} = require('./util');

const flags = process.argv.filter(arg => arg.startsWith('--'));
const session = getSession();
const client = new graphql.GraphQLClient('https://expo.io/--/graphql', {
  headers: {
    'Expo-Session': `${session}`,
  },
});

// PLATFORM DEFAULTS TO ANDROID IF NOT SET
const platform = flags.includes('--ios') ? 'IOS' : 'ANDROID';

const allBuildsQuery = `{
	buildJobs {
		all {
			id
			status
			updated
			platform
			artifacts {
				url
			}
		}
  }
}`;

const buildByIdQuery = `query ($buildId: ID!) {
	buildJobs {
		byId(buildId: $buildId) {
			id
			status
			updated
			platform
			artifacts {
				url
			}
		}
  }
}`;

const getLatestBuildId = async () => {
  const spinner = ora(`Getting latest ${platform} build job`).start();
  let jobs;
  try {
    jobs = await client.request(allBuildsQuery);
  } catch (error) {
    logError('Unexpected error');
    console.log(error);
    process.exit();
  }
  spinner.succeed();
  const newestJob = jobs.buildJobs.all.find(job => job.platform === platform);
  return newestJob.id;
};

const getBuildById = async buildId => {
  let job;
  try {
    job = await client.request(buildByIdQuery, {buildId});
  } catch (error) {
    logError('Unexpected error');
    console.log(error);
    process.exit();
  }
  return job.buildJobs.byId;
};

const pollRelease = async (id, persistedSpinner) =>
  new Promise(async resolve => {
    const spinner = persistedSpinner || ora('Waiting for build to finish').start();

    const check = async () => {
      let job = await getBuildById(id);
      if (job.status === 'IN_PROGRESS') {
        setTimeout(check, 15000);
        return;
      }
      if (job.status === 'FINISHED') {
        spinner.succeed();
        resolve(job.artifacts.url);
        return;
      }
      if (job.status === 'ERRORED') {
        logError('Build errored');
        process.exit();
        return;
      }
    };
    check();
  });

module.exports = {getLatestBuildId, getBuildById, pollRelease};
