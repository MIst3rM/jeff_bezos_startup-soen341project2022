describe("Register", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("http://store.conco/register");
  });

  it("Successful registration of new account", () => {
    cy.get("input[name=first-name]").type("Don");
    cy.get("input[name=last-name]").type("Johnston");
    cy.get("input[name=email]").type("don.johnston@example.com");
    cy.get("input[name=password]").type("Password_123");
    cy.get("input[name=password_confirmation]").type(`Password_123{enter}`);

    cy.wait(2000);

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "store")
      .should("be.not.equal", "undefined");

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "store")
      .should("be.not.equal", '{"auth":{"user":null}}');

    cy.wait(2000);

    cy.get("[data-cy=username]").should("be.visible");

    // preparing for next test
    cy.get("[data-cy=menu]").click();
    cy.get("[data-cy=logout]").click();
  });
});
