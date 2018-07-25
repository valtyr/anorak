const {getLatestBuildId, pollRelease} = require('./exp-poll');
const {uploadBinary} = require('./upload-binary');
const {downloadBinary} = require('./util');

(async () => {
  const buildId = await getLatestBuildId();
  const assetUrl = await pollRelease(buildId);
  const binaryFilePath = await downloadBinary(assetUrl);
  await uploadBinary(binaryFilePath);
})();
