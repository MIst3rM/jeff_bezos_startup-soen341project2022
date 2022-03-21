describe("Browse", () => {
  beforeEach(() => {
    cy.visit("http://store.conco/shop");
  });

  it("Should display available items", () => {
    cy.scrollTo("bottom", { duration: 2000 });
  });
});
