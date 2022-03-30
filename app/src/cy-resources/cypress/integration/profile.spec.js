describe("Profile", () => {
  beforeEach(() => {
    cy.visit("http://store.conco");
    cy.viewport("macbook-16");
  });

  it("Should display forms to edit information", () => {
    cy.visit("http://store.conco/login");
    cy.get("input[name=email]").type("MI5t3r_M@gmail.com");
    cy.get("input[name=password]").type(`Password_123{enter}`);

    cy.wait(2000);

    cy.visit("http://store.conco/profile");

    cy.get("[data-cy=personal_info_form]").should("be.visible");
    cy.get("[data-cy=password_form]").should("be.visible");
    cy.get("[data-cy=address_form]").should("be.visible");
  });

  //   it("Should be able to change name", () => {
  //     cy.wait(5000);

  //     cy.visit("http://store.conco/profile");

  //     cy.wait(5000);

  //     cy.get("[data-cy=personal_info_form]").within(() => {
  //       cy.get("input[name=first-name]").clear();
  //       cy.wait(5000);
  //       cy.get("input[name=first-name]").type("Mister");
  //       cy.get("[data-cy=save_info]").click();
  //     });

  //     cy.wait(5000);

  //     cy.reload();

  //     cy.wait(5000);

  //     cy.get("[data-cy=personal_info_form]").within(() => {
  //       cy.get("input[name=first-name]").should("have.value", "Mister");
  //     });
  //   });
});
