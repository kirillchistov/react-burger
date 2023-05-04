describe("Application", () => {
  beforeEach(() => {
    let email = "ben123@mail.ru";
    let password = "12345678";
    cy.visit("http://localhost:3000/");
    cy.get("[data-testid=email_input]").type(`${email}{enter}`);
    cy.get("[data-testid=password_input]").type(`${password}{enter}`);
  });

  it("should go to login page after logout", () => {
    cy.get(".header__logout").click();
    cy.get(".auth-form").should("exist");
  });
});
