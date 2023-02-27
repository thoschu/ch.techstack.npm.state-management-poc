describe('My First Test', () => {
  it('Does not di much', () => {
    expect(true).to.equal(true);
  });

  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('State Management POC');
    cy.get('.home').its('length').should('be.at.least', 1);
  });

  it('Does not di much', () => {
    cy.visit('/login');
    cy.get('#username').type('tom');
    cy.get('#pasword').type('hallo2');
    cy.wait(1000);
    cy.get('#loginButton').click();
    // cy.on('window:confirm', () => true); // Browser Events
    // cy.intercept('**/api/tasks/**');
  });
})
