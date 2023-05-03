//selects inputs for Register
const btnRegister = document.querySelector(".btnRegister");
const registrationForm = document.querySelector("#registrationForm");
const userName = document.querySelector("#user_name");
const registerEmail = document.querySelector("#register_email");
const registerPassword = document.querySelector("#register_password");
const registerRepeatPassword = document.querySelector(
  "#register_repeat_password"
);

btnRegister.addEventListener("click", function checkRegisterValidation(e) {
  e.preventDefault();

  //Register form
  if (userName.value.length < 3) {
    showAlert("name must be 3 letters long");
  } else if (!registerEmail.value.length) {
    showAlert("enter your email");
  } else if (registerPassword.value.length < 8) {
    showAlert("password should be 8 letters long");
  } else if (registerRepeatPassword.value !== registerPassword.value) {
    showAlert("passwords do not match");
  } else {
    //enters the form and create user then send to server
    let user = new User();
    user.userName = userName.value;
    user.registerEmail = registerEmail.value;
    user.registerPassword = registerPassword.value;
    user.create();
    // registrationForm.reset();
  }
});

//Alert box function
const showAlert = (msg) => {
  let alertBox = document.querySelector(".alertBox");
  let alertMsg = document.querySelector(".alertMess");
  alertMsg.innerHTML = msg;
  alertBox.classList.add("show");
  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
};

//selects inputs for Login
const loginForm = document.querySelector("#loginForm");
const loginEmail = document.querySelector("#login_email");
const loginPassword = document.querySelector("#login_password");
const btnLogin = document.querySelector(".btnSignIn");

btnLogin.addEventListener("click", function checkLoginValidation(e) {
  e.preventDefault();

  //Login form
  let user = new User();
  user.registerEmail = loginEmail.value;
  user.registerPassword = loginPassword.value;
  user.login();
});
