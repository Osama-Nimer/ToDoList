// HTML elements
const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

// Toggle sign-up and sign-in
registerbtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginbtn.addEventListener("click", () => {
  container.classList.remove("active");
});

// Handle sign-in functionality
document.querySelector(".sign-in form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    // Fetch the user from API
    fetch(`https://todoliist.runasp.net/api/User/GetUser?UserName=${username}&Password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then((user) => {
        // Successful login, store userID in localStorage
        localStorage.setItem("userID", user.userID);
        console.log("Login successful:", user);
        window.location.href = "home_page.html"; // Redirect to home page
      })
      .catch((error) => {
        console.error("Error during login:", error);
        alert("Invalid username or password. Please try again."); // Show error
      });
  } else {
    alert("Please enter both username and password.");
  }
});