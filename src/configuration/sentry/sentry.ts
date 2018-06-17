import * as Raven from 'raven-js';

const sentry = () => {
  const configurations = {
    key: process.env.SENTRY_KEY,
    project: process.env.SENTRY_PROJECT 
  }

  if (process.env.SENTRY_KEY && process.env.SENTRY_PROJECT) {
    Raven
      .config(
        `https://${configurations.key}@sentry.io/${configurations.project}`,
        {
          debug: process.env.NODE_ENV !== 'production',
          environment: process.env.NODE_ENV
        }
      )
      .install();
  }
}
export default sentry;
