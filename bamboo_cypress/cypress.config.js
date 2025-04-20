const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: true,
    supportFile: 'cypress/support/e2e.js',
    specPattern: 'cypress/e2e/**/*.cy.js',
    video: false,
    screenshotsFolder: 'cypress/screenshots',
    viewportWidth: 1280,
    viewportHeight: 720,
    // reporter: 'mochawesome', // contohnya, jika kamu pakai mochawesome sebagai reporter
    // reporterOptions: {
    //   overwrite: false,
    //   html: false,
    //   json: true
    // },
    pageLoadTimeout: 100000,
    // retries: 1,
  },
});
