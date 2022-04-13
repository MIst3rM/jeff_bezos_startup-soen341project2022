describe("Cart", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
  });

  it("Adding an item to cart", () => {
    cy.visit("http://store.conco/shop");

    cy.get("[data-cy=add_to_cart]").first().click();

    cy.wait(1000);

    cy.visit("http://store.conco/cart");

    cy.get("[data-cy=item_title]")
      .first()
      .should("contain", "Opna Women's Short Sleeve Moisture");
  });

  it("Increase item quantity in cart", () => {
    cy.visit("http://store.conco/cart");

    cy.get("[data-cy=increaseQuantity]").first().click();

    cy.get("[data-cy=quantity]").first().should("contain", "2");
  });
});
