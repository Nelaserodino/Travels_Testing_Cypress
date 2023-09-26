/// <reference types="Cypress" /> 
describe('Testing login', () => {
    beforeEach(() => {
        cy.connect()
    })
    it('login access', () => {
        cy.login()
        cy.logout()
    });
    
});
  