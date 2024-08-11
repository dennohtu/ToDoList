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
    cy.url().should("include", "/dashboard");
  } );
  
 
} );



