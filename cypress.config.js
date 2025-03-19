const { defineConfig } = require("cypress");

module.exports = defineConfig({
  chromeWebSecurity: false,
  failOnStatusCode: false,
  viewportHeight: 768,
  viewportWidth: 1024,
  watchForFileChanges: false,
  e2e: {
    baseUrl: 'http://siakad.test/spmbfront',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
