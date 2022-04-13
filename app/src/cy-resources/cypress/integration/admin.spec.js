describe("Admin", () => {
    beforeEach(() => {
      cy.viewport("macbook-16");
      cy.visit("http://admin.store.conco/");
    });
  
    it("Deleting a user", () => {
      cy.intercept("/api/login").as("Login");
      cy.intercept("/api/allUsers").as("Users");
  
      cy.get("input[name=email]").type("MI5t3r_M@gmail.com");
      cy.get("input[name=password]").type(`Password_123{enter}`);
  
      cy.wait("@Login", { timeout: 30000 });
  
      cy.get("a[href='/admin/MI5t3r/manage_users']").click();
  
      cy.wait("@Users", { timeout: 30000 });
  
      cy.get("li").last().find("button").click();
  
      cy.wait(1000);
  
      cy.get("[data-cy=delete_user_confirm]").find("button").last().click();
  
      cy.wait(1000);
  
      cy.get("[data-cy=user_deleted]").should("be.visible");
  
      // preparing for next test
      cy.get("[data-cy=menu]").click();
      cy.get("[data-cy=logout]").click();
    });
  });