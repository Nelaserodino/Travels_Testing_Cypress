class UserApiPage {
    constructor(baseUrl) {
      this.baseUrl = baseUrl; 
    }
  
    // Method to get a user
    getUserById(userId, options = {}) {
        return cy.request({
            method: 'GET',
            url: `${this.baseUrl}/users/oneUser/${userId}`,
            ...options, 
        });
    }

    // Method to create a user
    createUser(userData, options = {}) {
        return cy.request({
            method: 'POST',
            url: `${this.baseUrl}/users/createUser`,
            body: userData,
            ...options, 
        });
    }
  
    // Method to edit a user
    updateUser(userId, updatedUserData, options = {}) {
        return cy.request({
            method: 'PUT',
            url: `${this.baseUrl}/users/editUser/${userId}`,
            body: updatedUserData,
            ...options
        })
    }
  
    // Method to delete a user
    deleteUser(userId,  options = {}) {
        return cy.request({
            method: 'DELETE',
            url: `${this.baseUrl}/users/deleteUser/${userId}`,
            ...options
        })
    }
  
    // Method to get all users
    getAllUsers() {
      cy.request('GET', `${this.baseUrl}/allUser`);
    }
  }
  
  // Export the class in order to use it in the test scripts
  export default UserApiPage;
  