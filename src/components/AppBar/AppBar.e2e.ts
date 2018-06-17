/// <reference types="jest"/>
/// <reference types="cypress"/>

describe("AppBar component", () => {
  it("survey button shall redirect to survey", () => {
    cy.visit("/");

    cy.get('[data-e2e="SurveyButton"]').should("have.length", 1);
  });
});
