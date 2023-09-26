/// <reference types="Cypress" /> 

Cypress.Commands.add('connect', () => {
    cy.visit('http://localhost:3000/login')
    cy.title().should("contain", "React App")
    cy.location('hostname').should('eq', 'localhost')
    cy.location('protocol').should('contain', 'http')
})

Cypress.Commands.add('login', () => { 
    cy.get('[placeholder="Email"]').clear('n');
    cy.get('[placeholder="Email"]').type('nela@test.com');
    cy.get('[placeholder="Password"]').clear('1');
    cy.get('[placeholder="Password"]').type('1234');
    cy.get('.divFormAuth > :nth-child(3)').click(); 
})

Cypress.Commands.add('logout', () => { 
    cy.get(':nth-child(4) > :nth-child(3)').click();
})