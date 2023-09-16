describe('Testing the database connection', () => {
  it('Insert', () => {
    cy.task('queryDB', 'INSERT INTO user (name, lastname, email, password) VALUES ("Lola", "Smith", "lola@test.com", "1234") ').then(
      (result) => {
        cy.log(result)
        expect(result.affectedRows).to.eq(1)
        cy.wrap(result.insertId).as("user_id")
      }
    );
  });

  it('Select to check that the user was inserted correclt', function()  {
    cy.task('queryDB', `SELECT * FROM user where user_id = ${this.user_id}`).then(
      (result) => {
        cy.log(result)
        expect(result[0].name).to.equal('Lola')
        expect(result[0].lastname).to.equal('Smith')
      }
    );
  });

  it('Delete', function() {
    cy.task('queryDB', `DELETE FROM user where user_id = ${this.user_id}`).then(
      (result) => {
        cy.log(result)
        expect(result.affectedRows).to.eq(1)
        expect(result.serverStatus).to.eq(2)
      }
    );
  });
  
});
