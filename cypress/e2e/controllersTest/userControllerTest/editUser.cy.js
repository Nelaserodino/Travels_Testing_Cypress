// Import the UserApiPage class
import UserApiPage from "../../../POM/UserApiPage";

// Import the method to create a random Email
import { generateRandomEmail } from "../../../support/utils";

describe('Edit User API', () => {
  const userApi = new UserApiPage("http://localhost:4000");
  let createdUserId;

  before(() => {
    const randomEmail = generateRandomEmail();
    const userData = {
      name: "John Doe",
      email: randomEmail,
      password: "password123",
    };

    userApi.createUser(userData)
      .then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("insertId");
        createdUserId = response.body.insertId;
      });
  });

  it('should update user information successfully', () => {
    const updatedUser = {
      name: "Jane",
      lastname: "Poppins",
    };

    userApi.updateUser(createdUserId, updatedUser)
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property('changedRows', 1);
      });
  });

  it('should handle updating with an empty request body', () => {
    const emptyBody = {}; // Empty request body
    userApi.updateUser(createdUserId, emptyBody, { failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property('error', 'No fields to update');
      });
  });

  it('should handle updating with an invalid user ID', () => {
    const updatedUserData = {
      name: 'UpdatedName',
      lastname: 'UpdatedLastname',
      phone: '1234567890',
      address: 'UpdatedAddress',
      email: 'updated@example.com',
    };

    userApi.updateUser(999999, updatedUserData, { failOnStatusCode: false })
      .then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('error', 'User not found');
      });
  });

  // Clean up: Delete the test user created before testing
  after(() => {
    userApi.deleteUser(createdUserId)
      .then(response => {
        expect(response.status).to.eq(200);
      });
  });
});
