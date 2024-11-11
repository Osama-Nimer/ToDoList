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

function signUpUser() {
  // الحصول على القيم من المدخلات
  const username = document.getElementById('sign-up-user').value;
  const password = document.getElementById('sign-up-pass').value;
  const confirmPassword = document.getElementById('sign-up-ConPass').value;

  // التأكد من أن كلمة المرور و التأكيد متطابقين
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  // تحضير البيانات للإرسال
  const userData = {
    userID: 0,  // إذا كانت الـ API تحتاج إلى ID يمكن تركه 0 أو تخصيصه
    userName: username,
    password: password
  };

  // إرسال البيانات باستخدام fetch
  fetch('https://todoliist.runasp.net/api/User/AddNewUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  })
  .then(response => response.json())
  .then(data => {
    // هنا يمكنك إضافة منطق للتعامل مع الاستجابة
    console.log('User created successfully:', data);
    alert("User created successfully!");
  })
  .catch(error => {
    console.error('Error:', error);
    alert("An error occurred while creating the user.");
  });
}

// استدعاء دالة signUpUser عند الضغط على زر التسجيل
document.getElementById('Up').addEventListener('click', signUpUser);
