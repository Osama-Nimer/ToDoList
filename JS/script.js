// HTML elements
const container = document.getElementById("container");
const registerbtn = document.getElementById("register");
const loginbtn = document.getElementById("login");

// Toggle sign-up and sign-in
document.querySelector(".sign-in form").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("Username:", username); // Log username to check value
  console.log("Password:", password); // Log password to check value

  // Validate inputs
  if (username === "" || password === "") {
    alert("Please fill out all fields.");
    return;
  }

  // Proceed with login API call
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
});



document.getElementById('Up').onclick = sign_up;
function sign_up(event) {
  // منع إرسال النموذج تلقائيًا
  event.preventDefault();

  // الحصول على القيم من المدخلات
  const username = document.getElementById("sign-up-user").value.trim();
  const password = document.getElementById("sign-up-pass").value.trim();
  const confirmPassword = document.getElementById("sign-up-ConPass").value.trim();

  // التحقق من أن جميع الحقول تم تعبئتها
  if (username === "" || password === "" || confirmPassword === "") {
    alert("Please fill out all fields.");
    return;
  }

  // التحقق من أن كلمة المرور وتأكيد كلمة المرور متطابقتين
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  // إنشاء كائن البيانات الجديد للمستخدم
  const newUser = {
    userID: 0, // يمكن أن يتم توليد هذا من الخادم
    userName: username,
    password: password
  };

  // إرسال طلب POST لإنشاء المستخدم
  fetch('https://todoliist.runasp.net/api/User/AddNewUser', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(newUser)
})
.then((response) => {
  console.log("Response Status: ", response.status);  // Log the status code
  if (!response.ok) {
    throw new Error('Failed to sign up. Please try again.');
  }
  return response.json();
})
.then((data) => {
  console.log('User created successfully:', data);  // Log the data response
  alert('Sign Up successful!');
  window.location.href = 'login_page.html'; // Redirect to login page or another page
})
.catch((error) => {
  console.error('Error during sign up:', error);
  alert('Error: ' + error.message);
});
}
