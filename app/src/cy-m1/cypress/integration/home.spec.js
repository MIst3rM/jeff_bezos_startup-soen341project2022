describe("Home", () => {
  beforeEach(() => {
    cy.visit("http://store.conco/");
  });

  it("Should display available items", () => {
    cy.get('[data-cy="item-card"]').should("be.visible");
  });
});
