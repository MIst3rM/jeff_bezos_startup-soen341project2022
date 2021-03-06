describe("Seller", () => {
  beforeEach(() => {
    cy.viewport("macbook-16");
    cy.visit("http://admin.store.conco/");
  });

  it("Adding a new item as a seller", () => {
    cy.get("input[name=email]").type("agent_smith@seller.conco");
    cy.get("input[name=password]").type(`Password_123{enter}`);

    cy.get("a[href='/seller/Agent/listed']").click();

    cy.wait(3000);

    cy.get("[data-cy=add_new_item]").click();

    cy.wait(1000);

    cy.get("input[name=title]").type("Women's T -Shirt Blank, V -Neck");
    cy.get("textarea").type(
      "Runs small, order 1-2 sizes up.\nCompatible with Infusible Ink™ Transfer Sheets, Pens & Markers for peel-proof, flake-proof, wash-proof transfers"
    );
    cy.get("input[type=file]").selectFile("cypress/test_images/test.jpg", {
      force: true,
    });
    cy.contains("span", "Women's Clothing").click({ force: true });
    cy.get("input[name=price]").type("10");

    cy.get("[data-cy=add_item]").click();

    cy.wait(2000);

    cy.get("[data-cy=item_added]").should("be.visible");

    // preparing for next test
    cy.get("[data-cy=menu]").click();
    cy.get("[data-cy=logout]").click();
  });

  it("Delete an item as a seller", () => {
    cy.get("input[name=email]").type("agent_smith@seller.conco");
    cy.get("input[name=password]").type(`Password_123{enter}`);

    cy.get("a[href='/seller/Agent/listed']").click();

    cy.wait(2000);

    cy.get("li").last().find("button").click();

    cy.wait(1000);

    cy.get("[data-cy=delete_item_confirm]").find("button").last().click();

    // preparing for next test
    cy.get("[data-cy=menu]").click();
    cy.get("[data-cy=logout]").click();
  })
});
