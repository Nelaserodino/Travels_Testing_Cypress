// Import the UserApiPage class
import UserApiPage from "../../../POM/UserApiPage";

// Import the method to create a random Email
import {generateRandomEmail} from "../../../support/utils"

describe("Create User API", () => {
  const userApi = new UserApiPage("http://localhost:4000");
  let createdUserId;

  it("should create a user", () => {
    const randomEmail = generateRandomEmail(); // Generate a random email for each test run
    const userData = {
      name: "John Doe",
      email: randomEmail, 
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

  it("should handle missing required fields", () => {
    const userData = {
      name: "Jane Doe",
    };

    userApi
      .createUser(userData, { failOnStatusCode: false }) // Pass the option here
      .then(response => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include(
          "Email and password are required"
        );
      });
  });

  it("should handle invalid email format", () => {
    const userData = {
      name: "Invalid Email User",
      email: "invalid-email", // Invalid email format
      password: "password123",
    };

    userApi
      .createUser(userData, { failOnStatusCode: false }) // Pass the option here
      .then(response => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("Invalid email format"); // Updated error message
      });
  });

  it("should handle database errors (duplicate email)", () => {
    // Create a user with a duplicate email to trigger a database error
    const duplicateEmail = generateRandomEmail();
    let createdDuplicateUserId;

    cy.request({
      method: "POST",
      url: "/users/createUser",
      body: {
        name: "Duplicate Email User",
        email: duplicateEmail,
        password: "password123",
      },
    }).then(response => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("insertId");
      createdDuplicateUserId = response.body.insertId;

      // Next, create another user with the same email (duplicateEmail)
      cy.request({
        method: "POST",
        url: "/users/createUser",
        body: {
          name: "Duplicate Email User 2",
          email: duplicateEmail,
          password: "password123",
        },
        failOnStatusCode: false,
      }).then(response => {
        expect(response.status).to.eq(400);
        expect(response.body).to.have.property("error");
        expect(response.body.error).to.include("User already exists"); // Updated error message

        // Now that the duplicate user error is handled, delete the user with the duplicate email
        cy.request({
          method: "DELETE",
          url: `/users/deleteUser/${createdDuplicateUserId}`, // Use the correct variable
        }).then(duplicateUserResponse => {
          expect(duplicateUserResponse.status).to.eq(200);
        });
      });
    });
  });

  it("delete the created user", () => {
    userApi.deleteUser(createdUserId).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});
