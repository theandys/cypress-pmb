import { faker } from "@faker-js/faker"

Cypress.on('uncaught:exception', (err, runnable) => {
    return false
})

Cypress.Commands.add('LanjutDaftar', () => {
    cy.contains('Lanjutkan Mendaftar').click();
})

Cypress.Commands.add('SimpanLanjut', () => {
    cy.contains('SIMPAN DAN LANJUTKAN').click();
})

Cypress.Commands.add('fakerFullName', (prefix, sex = 'male') => {
    return cy.wrap(prefix + ' ' + faker.person.fullName(sex));
})

Cypress.Commands.add('fakerEmail', (sex = 'male', domain = '@cypress.io') => {
    return cy.wrap(faker.person.firstName(sex) + domain);
})

Cypress.Commands.add('fakerNumberPhone', (prefix = '08') => {
    return cy.wrap(prefix + faker.number.int({ min: 1000000000, max: 9999999999 }));
    // return cy.wrap(prefix + faker.random.numeric(10)); // depcrecated
})

Cypress.Commands.add('fakerNIK', (prefix = '3528') => {
    return cy.wrap(prefix + faker.number.int({ min: 100000000000, max: 999999999999 }));
    // return cy.wrap(prefix + faker.random.numeric(12)); // depcrecated
})

Cypress.Commands.add('fakerNISN', (prefix = '0') => {
    return cy.wrap(prefix + faker.number.int({ min: 100000000, max: 999999999 }));
})