/* ==== Test Created with Cypress Studio ==== */
it('managerFlow', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/login');
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').clear('sherilyn.ernser@gmail.com');
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type('sherilyn.ernser@gmail.com');
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear('7u83qlx3qhnsgj');
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type('7u83qlx3qhnsgj');
  cy.get('[data-testid="button-test-id"]').click();
  cy.get('.links > :nth-child(1) > .link').should('be.visible');
  cy.get('.links > :nth-child(1) > .link').should('have.text', 'sherilyn.ernser@gmail.com  MANAGER');
  cy.get(':nth-child(2) > .editBtn').click();
  cy.get(':nth-child(1) > .form-label').should('be.visible');
  cy.get(':nth-child(2) > .form-label').should('be.visible');
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').should('be.disabled');
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').should('be.disabled');
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').should('be.visible');
  cy.get(':nth-child(5) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(6) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(7) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(6) > [data-testid="form-entry-input"]').should('be.visible');
  cy.get(':nth-child(7) > [data-testid="form-entry-input"]').should('be.visible');
  cy.get('[data-testid="button-test-id"]').should('be.visible');
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').clear('Alane CarterRR');
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').type('Alane CarterRR CHANGED');
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(':nth-child(2) > [data-testid="card-info"] > .host-info > .name').should('have.text', 'Alane CarterRR CHANGED');
  cy.get(':nth-child(2) > [data-testid="card-info"] > .host-info > .org').click();
  cy.get(':nth-child(4) > .link').should('be.visible');
  cy.get(':nth-child(4) > .link').should('have.text', 'Add Event');
  cy.get(':nth-child(1) > [data-testid="card-info"]').click();
  cy.get(':nth-child(1) > .form-label').should('be.visible');
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').should('be.disabled');
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').should('be.visible');
  cy.get(':nth-child(2) > .form-label').should('be.visible');
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').should('be.enabled');
  cy.get(':nth-child(4) > .form-label').should('be.visible');
  cy.get(':nth-child(2) > .form-label').should('be.visible');
  cy.get(':nth-child(3) > .form-label').should('be.visible');
  cy.get('[data-testid="event-form"]').click();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type('ABILITY CHANGED');
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(':nth-child(1) > [data-testid="card-info"] > .event-info > .name').should('have.text', 'ABILITY CHANGED');
  cy.get('.sort').click();
  cy.get(':nth-child(1) > [data-testid="card-info"] > .event-info > .name').should('have.text', 'zero defect');
  /* ==== End Cypress Studio ==== */
});