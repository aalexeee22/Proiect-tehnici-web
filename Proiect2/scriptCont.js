/*// Login form
var loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");

  var username = usernameInput.value;
  var password = passwordInput.value;

  // Perform login validation logic here
  // Example: Check if username and password are correct
  if (username === "admin" && password === "password") {
    alert("Login successful!");
    // Redirect to another page or perform other actions
  } else {
    alert("Invalid username or password. Please try again.");
  }

  // Clear the form inputs
  usernameInput.value = "";
  passwordInput.value = "";
});


// Create account form
var createAccountForm = document.getElementById("createAccountForm");

createAccountForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var newUsernameInput = document.getElementById("newUsername");
  var newPasswordInput = document.getElementById("newPassword");

  var newUsername = newUsernameInput.value;
  var newPassword = newPasswordInput.value;

  // Perform create account logic here
  // Example: Save the new username and password to a database
  alert("Account created successfully!");

  // Clear the form inputs
  newUsernameInput.value = "";
  newPasswordInput.value = "";
});
*/
// Login form
var loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var usernameInput = document.getElementById("username");
  var passwordInput = document.getElementById("password");

  var username = usernameInput.value;
  var password = passwordInput.value;

  // Send login request to the server
  fetch("/conectare", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: username, password: password })
  })
    .then(function(response) {
      if (response.status === 200 || response.status === 201) {
        alert("Login successful!");
        // Redirect to another page or perform other actions
      } else {
        alert("Invalid username or password. Please try again.");
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

  // Clear the form inputs
  usernameInput.value = "";
  passwordInput.value = "";
});

// Create account form
var createAccountForm = document.getElementById("createAccountForm");

createAccountForm.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form submission

  var newUsernameInput = document.getElementById("newUsername");
  var newPasswordInput = document.getElementById("newPassword");

  var newUsername = newUsernameInput.value;
  var newPassword = newPasswordInput.value;

  // Send create account request to the server
  fetch("/creare_cont", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: newUsername, password: newPassword })
  })
    .then(function(response) {
      if (response.status === 200) {
        alert("Account created successfully!");
      } else if (response.status === 400) {
        alert("User already exists!");
      } else {
        console.log("Error:", response.statusText);
      }
    })
    .catch(function(error) {
      console.error("Error:", error);
    });

  // Clear the form inputs
  newUsernameInput.value = "";
  newPasswordInput.value = "";
});
