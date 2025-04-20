describe('Test Case A: Registration flow with login validation', () => {
  let testData;

  before(() => {
    cy.fixture('registerUser.json').then((data) => {
      testData = data;
    });
  });

  beforeEach(() => {
    cy.visit('https://magento.softwaretestingboard.com');
  });

  it('should register a new user, logout, and login again', () => {
    cy.registerGuestUser(testData);
    //Assertion successfully register
    cy.url().should('include', '/customer/account/');
    // cy.contains('.greet', `Welcome, ${testData.firstName}!`, { timeout: 10000 }).first().should('be.visible');
    cy.get('.message-success').should('contain', `Thank you for registering with Main Website Store.`), { timeout: 10000 };
    //logout
    cy.get(':nth-child(2) > .customer-welcome > .customer-name > .action').click();
    cy.get(':nth-child(2) > .customer-welcome > .customer-menu > .header > .authorization-link > a').contains('Sign Out').should('be.visible').click({ force: true });
    // cy.wait(1000).debug();

    //re-login
    cy.get('@generatedEmail').then((email) => {
      cy.login(email, testData.password).debug();

    //assertion re-login success
    cy.url().should('include', '/customer/account/');
    const accountName = Cypress.$('div.block-content .box-content p').text();
    expect(accountName).to.include(`Welcome, ${testData.firstName}!`).debug();
    // cy.get('span.logged-in', { timeout: 10000 }).should('contain', `Welcome, ${testData.firstName}!`);
  });

  // it('Input With Email That Already registered before', () => {
  // }

  // it('Guest user input email with invalid format', () => {
  //   cy.get('#firstname').type(testData.firstName);
  //   cy.get('#lastname').type(testData.lastName);
  //   cy.get('#email_address').type('invalidemail');
  //   cy.get('#password').type(testData.password);
  //   cy.get('#password-confirmation').type(testData.password);
  //   cy.get('button[type="submit"][title="Create an Account"]').click();

  //   cy.get('#email_address-error')
  //     .should('be.visible')
  //     .and('contain', 'Please enter a valid email address');
  //   });
  });
});
