describe('Test Case B: Place order with multiple products (apply price calculation checks)', () => {
  let user;

  before(() => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.fixture('loginUser').then((data) => {
      user = data;
    });
  });

  it('User added multiple products should see the correct total price', () => {
    // Login dengan data yang diambil dari fixture
    cy.login(user.userTask.email, user.userTask.password);

    // go to women page
    cy.visit('https://magento.softwaretestingboard.com/women/tops-women/jackets-women.html');
    cy.get('.products > :nth-child(2)').should('be.visible').click();
    /**get product name */
    cy.get('span.base[data-ui-id="page-title-wrapper"]').invoke('text').as('productName'); // Simpan nama produk
    //get price element
    cy.get('#product-price-1380 .price', { timeout: 10000 }).should('be.visible').invoke('text').then((priceTextProduct1) => {
    const priceProduct1 = priceTextProduct1.replace('$', '').trim();  //variable to delete "$"
    cy.log('Price of Product 1: ' + priceProduct1);
    cy.wrap(priceProduct1).as('priceProduct1');
    });
    cy.get('.swatch-attribute-options .swatch-option.text').eq(0).should('be.visible').and('not.have.class', 'disabled').click();
    cy.get('.swatch-attribute-options .swatch-option.color').eq(0).should('be.visible').and('not.have.class', 'disabled').click();
    /**input quantity product */
    cy.get('#qty').should('be.visible').clear().type('2');
    /**add to cart */
    cy.get('#product-addtocart-button').click();
    cy.get('@productName').then((productName) => {
      cy.get('.message-success div', {timeout: 10000})
        .should('contain.text', `You added ${productName.trim()} to your shopping cart`);
    });
    cy.scrollTo('top');
    cy.get('#ui-id-4 > :nth-child(2)').should('be.visible').click();
    debugger

    // cy.get('.showcart').click();

    // cy.visit('https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html'); // Ganti URL jika perlu

    // cy.get('.products > :nth-child(2)').should('be.visible').click(); // Klik produk kedua

    // cy.get('#product-price-1381 .price', { timeout: 10000 }).should('be.visible').invoke('text').then((priceTextProduct2) => {
    //   const priceProduct2 = priceTextProduct2.replace('$', '').trim(); // Menghapus simbol dolar dan spasi
    //   cy.log('Price of Product 2: ' + priceProduct2);
    // });
  });
});
