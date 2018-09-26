const promoteTools = require('./promoteRelease');
const getReleaseList = require('./getReleaseList');

(async () => {
  try {
    const releaseList = await getReleaseList();
    promoteTools.promoteRelease(releaseList);
  } catch (e) {}
})();
