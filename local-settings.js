/**
 * Local settings template.
 */
module.exports = {
  styleguideApi: 'wp-json/im-styleguide/v2',
  baseSite: 'slate',
  github: {
    baseUrl: 'https://github.immediate.co.uk',
    apiUrl: 'https://github.immediate.co.uk/api/v3',
    readOnlyToken: 'cmVhZG9ubHk6MlRja3pQcDJHazA2',
    repos: {
      patchwork: {
        name: 'patchwork',
        owner: 'WCP',
        branch: 'develop',
      },
      styleguide: {
        name: 'im-styleguide',
        owner: 'WCP',
        branch: 'develop',
      },
    }
  }
};
