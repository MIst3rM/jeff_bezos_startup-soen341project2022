describe("Cart", () => {
  beforeEach(() => {
    cy.visit("http://store.conco/");
  });

  it("Navigate to cart page when cart icon clicked", () => {
    cy.get('[data-cy="cart"]').click();
    cy.location("pathname").should("include", "cart");
  });
});
