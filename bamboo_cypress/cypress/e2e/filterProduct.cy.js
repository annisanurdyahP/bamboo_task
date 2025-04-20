const { config } = require("chai");

describe('Test Case (D): Search and validate results', () => {
  let user;
  const keyword = 'running';
  const keywordParts = keyword.toLowerCase().split(' ');

  const isNameMatchingKeywords = (name, keywords) => {
    const lowerName = name.toLowerCase();
    return keywords.every(word => new RegExp(`\\b${word}\\b`).test(lowerName));
  };

  before(() => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.fixture('loginUser').then((data) => {
      user = data;
    });
  });

  it('User search a product and validate the result', () => {
    cy.login(user.userTask.email, user.userTask.password);

    cy.get('#search').should('be.visible').type(`${keyword}{enter}`);

    cy.scrollTo('center');
    cy.wait(1000);

    cy.get('.product-item-link').should('exist');

    cy.get('.product-item-link').each(($el) => {
      cy.wrap($el)
        .invoke('text')
        .then((text) => {
          const productName = text.toLowerCase().trim();
          const isMatch = isNameMatchingKeywords(productName, keywordParts);

          cy.log(`Checking: "${productName}"`);
          cy.log(`Match: ${isMatch}`);

          expect(isMatch, `Expected "${productName}" to contain keyword(s): ${keywordParts}`).to.be.true;
        });
    });
  });
});