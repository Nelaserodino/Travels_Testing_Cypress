export function generateRandomEmail() {
  const uniqueId = Date.now(); // Use a timestamp to make the email unique
  const domain = "example.com"; // Change the domain as needed
  return `user${uniqueId}@${domain}`;
}
