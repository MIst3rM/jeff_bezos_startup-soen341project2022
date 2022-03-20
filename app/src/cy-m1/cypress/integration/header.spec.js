describe("Header", () => {
  beforeEach(() => {
    cy.visit("http://store.conco");
  });

  it("Logged in user sees a menu clicking on person icon", () => {
    cy.viewport("macbook-16");
    cy.visit("http://store.conco/login");
    cy.get("input[name=email]").type("MI5t3r_M@gmail.com");
    cy.get("input[name=password]").type(`password{enter}`);
    cy.wait(2000);
    cy.window()
      .its("sessionStorage")
      .invoke("getItem", "store")
      .should("be.not.equal", '{"auth":{"user":null}}');
    cy.wait(2000);
    cy.get("[data-cy=menu]").click();
    cy.get("[data-cy=profile]").click();
  });
});
