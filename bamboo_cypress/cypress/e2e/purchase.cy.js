describe('Test Case (C): Add products in Wishlist and checkout from wishlist', () => {
  let user;

  before(() => {
    cy.visit('https://magento.softwaretestingboard.com');
    cy.fixture('loginUser').then((data) => {
      user = data;
    });
  });

  it('User purchase an items from wishlist', () => {
    const shippingDataUser = {
      firstname: 'Testing',
      lastname: 'Task',
      street: 'st. testing task',
      city: 'Jakarta',
      postcode: '16533',
      country: 'Indonesia',
      telephone: '6281233333333'
    };

    cy.login(user.userPurchase.email, user.userPurchase.password);
    cy.get('#ui-id-4 > :nth-child(2)').should('be.visible').click();
    cy.get('.categories-menu > :nth-child(2) > :nth-child(1) > a').click();
    cy.get('.products > :nth-child(2)', {timeout:10000}).should('be.visible').click();

    /**get title, price,size,and colour */
    cy.get('span.base[data-ui-id="page-title-wrapper"]').invoke('text').as('productName');
    cy.get('[data-price-type="finalPrice"]', { timeout: 10000 }).should('be.visible').invoke('text').then((priceTextProduct1) => {
      const priceProduct1 = priceTextProduct1.replace('$', '').trim();  //variable to delete "$"
      cy.log('Price of Product 1: ' + priceProduct1);
      cy.wrap(priceProduct1).as('priceProduct1');
      });
      cy.wait(1000); //waiting for element size and color
      cy.get('.swatch-option.text').not('.disabled').first().should('be.visible').click();
      cy.get('.swatch-option.color').first().should('be.visible').click();
      cy.scrollTo('top', {timeout:5000});
      cy.get('#product-addtocart-button').click();
      cy.get('@productName').then((productName) => {
        cy.get('.message-success div', {timeout: 10000})
          .should('contain.text', `You added ${productName.trim()} to your shopping cart`);
      });
      cy.get('.showcart', {timeout:5000}).click();
      cy.get('#top-cart-btn-checkout', { timeout: 10000 }).should('be.visible').click();

      /**assertion success open shipping page */
      cy.get('.step-title[data-role="title"]', {timeout:10000}).should('exist').and('contain.text', 'Shipping Address');
      /** Input Shipping Data */
      // cy.get('[name="firstname"]').clear().type(shippingDataUser.firstname);
      // cy.get('[name="lastname"]').clear().type(shippingDataUser.lastname);
      // cy.get('[name="street[0]"]').type(shippingDataUser.street);
      // cy.get('[name="postcode"').type(shippingDataUser.postcode)
      // cy.get('[name="country_id"]').select('ID')
      // cy.get('[name="city"]').type(shippingDataUser.city);
      // cy.wait(4000);
      // cy.get('[name="telephone"]',{timeout:4000}).should('be.visible').type(shippingDataUser.telephone);
      // cy.get('input[name="ko_unique_3"]').should('be.checked');
      // cy.wait(4000);
      // cy.get('button[data-role="opc-continue"]').contains('Next').click();
      // cy.wait(10000)
      cy.get('body').then($body => {
        // Cek apakah field firstname ada
        if ($body.find('[name="firstname"]').length > 0) {
          // Kalau field firstname ada, isi form
          cy.get('[name="firstname"]').clear().type(shippingDataUser.firstname);
          cy.get('[name="lastname"]').clear().type(shippingDataUser.lastname);
          cy.get('[name="street[0]"]').type(shippingDataUser.street);
          cy.get('[name="postcode"]').type(shippingDataUser.postcode);
          cy.get('[name="country_id"]').select('ID');
          cy.get('[name="city"]').type(shippingDataUser.city);
          cy.wait(4000);
          cy.get('[name="telephone"]', { timeout: 4000 }).should('be.visible').type(shippingDataUser.telephone);
          cy.get('input[name="ko_unique_3"]').should('be.checked');
          cy.wait(4000);
          cy.get('button[data-role="opc-continue"]').contains('Next').click();
        } else {
          // Kalau field firstname gak ada, berarti address sudah ada → langsung klik Next
          cy.get('button[data-role="opc-continue"]').contains('Next').click(); // pastikan ini adalah selector untuk tombol "Next"
        }
      });

      /** payment method step*/
      cy.get('.step-title[data-role="title"]', { timeout: 10000 }).should('include.text', 'Payment Method');
      cy.contains('.billing-address-details', shippingDataUser.firstname);
      cy.contains('.billing-address-details', shippingDataUser.lastname);
      cy.contains('.billing-address-details', shippingDataUser.city);
      cy.contains('.billing-address-details', shippingDataUser.street);
      cy.contains('.billing-address-details', shippingDataUser.postcode);
      cy.contains('.billing-address-details', shippingDataUser.country);
      cy.contains('.billing-address-details', shippingDataUser.telephone);

      cy.get('.payment-method-content > :nth-child(4) > div.primary > .action > span').click();
      cy.wait(8000);
      /**assertion */
      cy.get('span.base').should('be.visible').and('contain.text', 'Thank you for your purchase!');
      cy.get('.order-number strong').should('be.visible').invoke('text').should('not.be.empty');
      cy.get('a.action.print').should('be.visible').and('contain.text', 'Print receipt');
      debugger
      // cy.get('.swatch-option.color').not('.disabled').first().should('be.visible').click();
      // cy.get('.swatch-attribute-options .swatch-option.text').eq(0).should('be.visible').and('not.have.class', 'disabled').click();
      // cy.get('.swatch-attribute-options .swatch-option.color').eq(0).should('be.visible').and('not.have.class', 'disabled').click();

  }
)})