// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): void;
  }
}

Cypress.Commands.add("login", (name: string, password: string): void => {
  cy.get("#username").type(name);
  cy.get("#pasword").type(password);
  cy.get("#loginButton > span.mdc-button__label").click();
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
// --------------------------------------------------------------------------------------------------
// Cypress.Commands.add("logout", (email, password) => {
//   cy.intercept('POST', '**/auth').as('login');
//   cy.visit('/auth');
//   cy.get('[formcontrolname="email"]').type(email);
//   cy.get('[formcontrolname="password"]').type(password);
//   cy.get('form').submit();
//   cy.wait('@login').then(xhr => {
//     expect(xhr.request.body.email).to.equal(email);
//     expect(xhr.request.body.password).to.equal(password);
//   });
// });
