describe("Login", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("http://store.conco");
  });

  it("Successful login with valid credentials", () => {
    cy.viewport("macbook-16");
    cy.visit("http://store.conco/login");
    cy.get("input[name=email]").type("morrison@gmail.com");
    cy.get("input[name=password]").type(`83r5^_{enter}`);

    cy.wait(2000);

    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "store")
      .should("be.not.equal", '{"auth":{"user":null}}');

    cy.wait(2000);

    cy.get("[data-cy=username]").should("be.visible");

    // preparing for next test
    cy.get("[data-cy=menu]").click();
    cy.get("[data-cy=logout]").click();

    cy.wait(2000);
  });

  it("Failed login with invalid credentials with show error messages", () => {
    cy.visit("http://store.conco/login");
    cy.get("input[name=email]").type("test@gmail.com");
    cy.get("input[name=password]").type(`password{enter}`);

    cy.wait(2000);

    cy.get("[data-cy=login_failed]").should("be.visible");
  });
});
