/// <reference types="Cypress" /> 

Cypress.Commands.add('connect', () => {
    cy.visit('http://localhost:3000/login')
    cy.title().should("contain", "React App")
    cy.location('hostname').should('eq', 'localhost')
    cy.location('protocol').should('contain', 'http')
})

// Login with Xpaths
Cypress.Commands.add('login', () => { 
    cy.xpath('//input[@name="email"]')
        .should('have.attr', 'placeholder', 'Email') 
        .clear('n') 
        .type('nela@test.com'); 

    cy.xpath('//input[@name="password"]')
        .should('have.attr', 'placeholder', 'Password') 
        .clear('1') 
        .type('1234'); 

    cy.get('.divFormAuth > :nth-child(3)').click(); 
})

Cypress.Commands.add('logout', () => { 
    cy.get(':nth-child(4) > :nth-child(3)').click();
})