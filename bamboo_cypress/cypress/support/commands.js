import loginPage from "./pageObject/loginPage";
import RegisterPage from './pageObject/registerPage';


Cypress.Commands.add('login', (email, password) => {
  cy.get('.panel > .header > .authorization-link > a').contains('Sign In').should('be.visible').click({ force: true });
  cy.get(loginPage.emailField).type(email);
  cy.get(loginPage.passwordField).type(password);
  cy.get(loginPage.loginButton, { timeout: 10000 }).should('be.visible').click({ force: true });
});

Cypress.Commands.add('registerGuestUser', (testData) => {
  console.log('Running registerGuestUser command');
  const email = `test${Date.now()}${Math.floor(Math.random() * 1000)}@mail.tm`;
  cy.wrap(email).as('generatedEmail');
  cy.contains('a', 'Create an Account').click();
  cy.get(RegisterPage.firstNameField).type(testData.firstName);
  cy.get(RegisterPage.lastNameField).type(testData.lastName);
  cy.get(RegisterPage.emailField).type(email);
  cy.get(RegisterPage.passwordField).type(testData.password);
  cy.get(RegisterPage.confirmPasswordField).type(testData.password);
  cy.get(RegisterPage.submitButton).click();
});
