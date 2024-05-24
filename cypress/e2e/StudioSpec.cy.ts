/* ==== Test Created with Cypress Studio ==== */
it("adminFlow", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("http://localhost:3000/login");
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "admin@admin.com"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type("admin");
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(".links > :nth-child(1) > .link").should("be.visible");
  cy.get(".links > :nth-child(1) > .link").should(
    "have.text",
    "admin@admin.com  ADMIN"
  );
  cy.window().then((window) => {
    const authToken = window.localStorage.getItem("token");
    expect(authToken).to.exist;
  });
  cy.get(":nth-child(2) > .editBtn").click();
  cy.get(":nth-child(1) > .form-label").should("be.visible");
  cy.get(":nth-child(2) > .form-label").should("be.visible");
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').should(
    "be.disabled"
  );
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').should(
    "be.visible"
  );
  cy.get(':nth-child(5) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(6) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(7) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(6) > [data-testid="form-entry-input"]').should(
    "be.visible"
  );
  cy.get(':nth-child(7) > [data-testid="form-entry-input"]').should(
    "be.visible"
  );
  cy.get('[data-testid="button-test-id"]').should("be.visible");
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').clear(
    "Alane CarterRR"
  );
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').type(
    "Alane CarterRR CHANGED"
  );
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .host-info > .name'
  ).should("have.text", "Alane CarterRR CHANGED");
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .host-info > .org'
  ).click();
  cy.get(":nth-child(4) > .link").should("be.visible");
  cy.get(":nth-child(4) > .link").should("have.text", "Add Event");
  cy.get(':nth-child(1) > [data-testid="card-info"]').click();
  cy.get(":nth-child(1) > .form-label").should("be.visible");
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').should(
    "be.disabled"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').should(
    "be.visible"
  );
  cy.get(":nth-child(2) > .form-label").should("be.visible");
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get(":nth-child(4) > .form-label").should("be.visible");
  cy.get(":nth-child(2) > .form-label").should("be.visible");
  cy.get(":nth-child(3) > .form-label").should("be.visible");
  cy.get('[data-testid="event-form"]').click();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type(
    "ABILITY CHANGED"
  );
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(
    ':nth-child(1) > [data-testid="card-info"] > .event-info > .name'
  ).should("have.text", "ABILITY CHANGED");
  cy.get(".sort").click();
  cy.get(
    ':nth-child(1) > [data-testid="card-info"] > .event-info > .name'
  ).should("have.text", "zero defect");
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get(".title").click();
  cy.get(":nth-child(2) > .editBtn").click();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').should(
    "be.enabled"
  );
  cy.get('[data-testid="event-form"]').click();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type("ADMIN");
  cy.get('[data-testid="main-page-container"]').click();
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(":nth-child(2) > .editBtn").click();

  cy.get(".title").click();
  cy.get(":nth-child(2) > .link").click();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').clear(
    "ludie.conroy@yahoo.com"
  );
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "ludie.conroy@yahoo.com"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear("025crz0la");
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type("025crz0la");
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(
    ':nth-child(3) > [data-testid="card-info"] > .host-info > .org'
  ).click();
  cy.get(".links > :nth-child(1) > .link").should(
    "have.text",
    "ludie.conroy@yahoo.com  ADMIN"
  );
  cy.get(":nth-child(4) > .link").should("have.text", "Add Event");
  cy.get(":nth-child(4) > .link").click();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear("A");
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type("AAAAAAA");
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(3) > [data-testid="form-entry-input"]').type("2010-10-10");
  cy.get(".user-form > :nth-child(4)").click();
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').clear("B");
  cy.get(':nth-child(4) > [data-testid="form-entry-input"]').type("Bucuresti");
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .event-info > .name'
  ).should("have.text", "AAAAAAA");
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .event-info > .location'
  ).should("have.text", "Bucuresti");
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .event-info > .date'
  ).should("have.text", "Sun Oct 10 2010");
  cy.get(':nth-child(2) > [data-testid="remove-button"]').click();
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .event-info > .name'
  ).should("have.text", "array");
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .event-info > .name'
  ).should("be.visible");
  /* ==== End Cypress Studio ==== */
});
