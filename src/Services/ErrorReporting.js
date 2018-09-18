import Sentry from 'sentry-expo';

export const init = () => {
  // Sentry.enableInExpoDevelopment = true;
  Sentry.config(
    'https://05159110752d4877a8d090b24a47bfd8@sentry.io/1282351'
  ).install();
};

export const captureException = (error, logger) => {
  Sentry.captureException(error, {
    logger: logger
  });
};
