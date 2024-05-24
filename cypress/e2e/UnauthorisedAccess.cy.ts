/* ==== Test Created with Cypress Studio ==== */
it("UnauthorisedAccess", function () {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit("http://localhost:3000/login");
  cy.get(":nth-child(2) > .link").click();
  cy.get("h1").should("have.text", " Please log in to view events ");
  cy.get(":nth-child(3) > .link").click();
  cy.get("h1").should("have.text", " Please log in to view events ");
  cy.get(".title").click();
  cy.get("h1").should("be.visible");
  cy.get(".links > :nth-child(1) > .link").click();
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').clear(
    "darius.larkin@hotmail.com"
  );
  cy.get(':nth-child(1) > [data-testid="form-entry-input"]').type(
    "darius.larkin@hotmail.com"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').clear(
    "3cxehkdk7aqaj"
  );
  cy.get(':nth-child(2) > [data-testid="form-entry-input"]').type(
    "3cxehkdk7aqaj"
  );
  cy.get('[data-testid="button-test-id"]').click();
  cy.wait(5000);
  cy.window().then((window) => {
    const authToken = window.localStorage.getItem("token");
    expect(authToken).to.exist;
  });
  cy.visit("http://localhost:3000/register");
  cy.visit("http://localhost:3000/register");

  /* ==== End Cypress Studio ==== */
});
