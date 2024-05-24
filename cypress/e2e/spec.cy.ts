/* ==== Test Created with Cypress Studio ==== */
// it("loginTestUserNoPermissionToEditHost", function () {
//   /* ==== Generated with Cypress Studio ==== */
//   cy.visit("http://localhost:3000/login");
//   cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
//     "darius.larkin@hotmail.com"
//   );
//   cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type(
//     "3cxehkdk7aqaj"
//   );
//   cy.get('[data-testid="button-test-id"]').click();
//   cy.get(".links > :nth-child(1) > .link").should("be.visible");
//   cy.get(".links > :nth-child(1) > .link").should(
//     "have.text",
//     "darius.larkin@hotmail.com  USER"
//   );
//   cy.get(".title").click();
//   cy.on("window:alert", (alertText) => {
//     // Assert the text of the alert
//     expect(alertText).to.equal("You do not have permission to edit this host");
//   });
//   cy.get(":nth-child(2) > .editBtn").click();
//   cy.get(":nth-child(2) > .editBtn").click();
//   /* ==== End Cypress Studio ==== */
// });

// it("loginTestUser", function () {
//   /* ==== Generated with Cypress Studio ==== */
//   cy.visit("http://localhost:3000/login");
//   cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
//     "admin@admin.com"
//   );
//   /* ==== Generated with Cypress Studio ==== */
//   cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear("a");
//   cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type("admin");
//   cy.get('[data-testid="button-test-id"]').click();
//   cy.get(".title").click();
//   cy.get(":nth-child(1) > .editBtn").click();
//   /* ==== End Cypress Studio ==== */
// });
/* ==== Test Created with Cypress Studio ==== */
it("adminFlow", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("http://localhost:3000/login");
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "admin@admin.com"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type("admin");
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(":nth-child(1) > .editBtn").click();
  cy.get(".links > :nth-child(1) > .link").should("be.visible");
  cy.get(".links > :nth-child(1) > .link").should(
    "have.text",
    "admin@admin.com  ADMIN"
  );
  cy.get(".title").click();
  cy.get(
    ':nth-child(1) > [data-testid="card-info"] > .host-info > .email'
  ).click();
  cy.get(":nth-child(4) > .link").should("be.visible");
  cy.get(".name").should("be.visible");
  cy.get('[data-testid="footer-inner"]').should("be.visible");
  cy.get(".title").should("be.visible");
  cy.get(".links > :nth-child(1) > .link").should("be.visible");
  cy.get(":nth-child(2) > .link").click();
  cy.get(".navbar").should(
    "have.text",
    "PlanAheadLoginList EventsShow Statistics"
  );

  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "fakeusername"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type(
    "fakepassword"
  );
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(".error").should("have.text", "☒ Invalid username or password ☒");
  /* ==== End Cypress Studio ==== */
  /* ==== Generated with Cypress Studio ==== */
  cy.get('[data-testid="main-page-container"]').click();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "darius.larkin@hotmail.com"
  );
  cy.get(".user-form > :nth-child(2)").click();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear();
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type(
    "3cxehkdk7aqaj"
  );
  cy.get('[data-testid="button-test-id"]').click();
  cy.get(".links > :nth-child(1) > .link").should("be.visible");
  cy.get(".links > :nth-child(1) > .link").should(
    "have.text",
    "darius.larkin@hotmail.com  USER"
  );
  cy.on("window:alert", (alertText) => {
    // Assert the text of the alert
    expect(alertText).to.equal("You do not have permission to edit this host");
  });
  cy.get(":nth-child(1) > .editBtn").click();
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .host-info > .name'
  ).click();
  cy.get(
    ':nth-child(2) > [data-testid="card-info"] > .host-info > .name'
  ).click();
  cy.get(
    ':nth-child(1) > [data-testid="card-info"] > .host-info > .name'
  ).click();
  cy.get(".title").click();
  /* ==== End Cypress Studio ==== */
});
