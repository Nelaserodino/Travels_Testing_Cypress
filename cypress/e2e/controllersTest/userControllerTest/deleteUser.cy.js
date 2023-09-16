// Import the UserApiPage class
import UserApiPage from "../../../POM/UserApiPage";

// Import the method to create a random Email
import {generateRandomEmail} from "../../../support/utils"

describe("Get User API", () => {
  const userApi = new UserApiPage("http://localhost:4000");
  let createdUserId;

  it("should create a user", () => {
    const randomEmail = generateRandomEmail(); // Generate a random email for each test run
    const userData = {
      name: "John Doe",
      email: randomEmail, // Use the generated random email
      password: "password123",
    };

    userApi
      .createUser(userData)
      .then(response => {
        expect(response.status).to.eq(201);
        expect(response.body).to.have.property("insertId");
        createdUserId = response.body.insertId;
      })
      .should(response => {
        // Check for unexpected errors
        if (response.status !== 201) {
          throw new Error(`Failed to create user. Status: ${response.status}`);
        }
      });
  });

  it("should return an error message for an invalid user_id", () => {
    userApi.deleteUser(999999, { failOnStatusCode: false }).then(response => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property("error").to.eq("User not found");
      });
  });

  it("delete the created user", () => {
    userApi.deleteUser(createdUserId).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});
