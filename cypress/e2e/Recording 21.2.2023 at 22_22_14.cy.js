describe("Recording 21.2.2023 at 22:22:14", () => {
it("tests Recording 21.2.2023 at 22:22:14", () => {
  cy.viewport(1920, 968);

  cy.visit("http://localhost:4200/home");

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(2) > span > span").click();

  cy.get("#username").click();

  // cy.get("#username").type("tom");
  // cy.get("#pasword").type("hallo2");
  // cy.get("#loginButton > span.mdc-button__label").click();
  cy.login("tom", "hallo2");

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(1) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(2) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(3) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(1) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(2) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(3) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(1) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(3) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(1) > span > span").click();

  cy.get("body > app-root > app-navigation > mat-sidenav-container > mat-sidenav > div > mat-nav-list > app-menu > a:nth-child(3)").click();

  });
});
//# recorderSourceMap=BCCECGCICKCMAMAMCOCQCSCUCWCYCaCcCeCgBCiBC
