/// <reference types="jest"/>
/// <reference types="cypress"/>

describe("App", () => {
  it("visit the landing page", () => {
    cy.visit("/");
  });
});
