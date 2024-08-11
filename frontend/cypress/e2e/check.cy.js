describe("homepage", () => {
  it("loads", () => {
    cy.visit("http://localhost:5173/");
  } );
} );

describe("Login", () => {
  it("Should log in without issues", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#email").type("text");
    cy.get("#password").type("password", { log: false });
    cy.get("#login-button").click();
    cy.url().should( "include", "/dashboard" );
    cy.get("#todo-input").type("New Cypress Todo");
    cy.get("#add-todo-button").click();
    cy.get("#Todo").contains("new todo").should("be.visible");
  } );
  
  
} );



