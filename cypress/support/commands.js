Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

import './helpers.js';
import 'cypress-file-upload';