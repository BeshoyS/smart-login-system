// Global Vars
// Sign up Inputs
let suNameInput = document.getElementById("suNameInput");
let suEmailInput = document.getElementById("suEmailInput");
let suPassInput = document.getElementById("suPassInput");
let signupBtn = document.getElementById("signupBtn");

//sign up Validation Alerts
let suNameAlert = document.getElementById("suNameAlert");
let suPassAlert = document.getElementById("suPassAlert");
let suEmailAlert = document.getElementById("suEmailAlert");
let wrongInp = document.getElementById("wrongInp");
let rightInp = document.getElementById("rightInp");
let emailExistInp = document.getElementById("emailExistInp");

//Login Inputs
let loginEmail = document.getElementById("emailInput");
let loginPassword = document.getElementById("passInput");
let loginBtn = document.getElementById("loginBtn");
let wrongAlert = document.getElementById("wrongMsg");

let username = localStorage.getItem("usersname");

// Welcome pg
// let welcomeName = document.getElementsById("welcomeName");
let logoutBtn = document.getElementById("logoutBtn");
let deleteBtn = document.getElementById("deleteBtn");
let currentIndex;
// Retrevie the users' data from the localStorage
let allUsers;

if (localStorage.getItem("allUsers") == null) {
  allUsers = [];
} else {
  allUsers = JSON.parse(localStorage.getItem("allUsers"));
}

// Sign Up Page
function signup() {
    if (validateAll() == true && isExist() != true) {
      let userInfo = {
        name: suNameInput.value,
        email: suEmailInput.value,
        password: suPassInput.value,
      };
      allUsers.push(userInfo);
      localStorage.setItem("allUsers", JSON.stringify(allUsers));
  
      rightInp.classList.replace("d-none", "d-block");
    } else {
      if (isExist() == true) {
        emailExistInp.classList.replace("d-none", "d-block");
      } else {
        wrongInp.classList.replace("d-none", "d-block");
      }
    }
  }
  
  // Sign Up Validation
  //Name Validation
  function nameValidate() {
    const nameRegex = /^([A-Z][a-z]{2,9})(\s?[a-zA-Z]{3,10})?$/;
    wrongInp.classList.replace("d-block", "d-none");
    rightInp.classList.replace("d-block", "d-none");

    if (nameRegex.test(suNameInput.value) == true && suNameInput.value != "") {
      suNameInput.classList.add("is-valid");
      suNameInput.classList.remove("is-invalid");
      suNameAlert.classList.replace("d-block", "d-none");
      return true;
    } else {
      suNameInput.classList.add("is-invalid");
      suNameInput.classList.remove("is-valid");
      suNameAlert.classList.replace("d-none", "d-block");
      return false;
    }
  }
  
  //Email Validation
  function emailValidate() {
    const emailRegex = /@[a-z_A-Z]{3,}(.com)$/;
    wrongInp.classList.replace("d-block", "d-none");
    emailExistInp.classList.replace("d-block", "d-none");
    rightInp.classList.replace("d-block", "d-none");
  
    if (emailRegex.test(suEmailInput.value) == true && suEmailInput.value != "") {
      suEmailInput.classList.add("is-valid");
      suEmailInput.classList.remove("is-invalid");
      suEmailAlert.classList.replace("d-block", "d-none");
      return true;
    } else {
      suEmailInput.classList.add("is-invalid");
      suEmailInput.classList.remove("is-valid");
      suEmailAlert.classList.replace("d-none", "d-block");
      return false;
    }
  }
  
  //Password Validation
  function passwordValidate() {
    const passRegex = /^.{5,15}[0-9]$/;
    wrongInp.classList.replace("d-block", "d-none");
    rightInp.classList.replace("d-block", "d-none");
  
    if (passRegex.test(suPassInput.value) == true && suPassInput.value != "") {
      suPassInput.classList.add("is-valid");
      suPassInput.classList.remove("is-invalid");
      suPassAlert.classList.replace("d-block", "d-none");
      return true;
    } else {
      suPassInput.classList.add("is-invalid");
      suPassInput.classList.remove("is-valid");
      suPassAlert.classList.replace("d-none", "d-block");
      return false;
    }
  }
  
  // Total Validation
  function validateAll() {
    nameValidate();
    emailValidate();
    passwordValidate();
  
    if (
      nameValidate() == true &&
      emailValidate() == true &&
      passwordValidate() == true
    ) {
      return true;
    } else {
      return false;
    }
  }
  
  // If the email is existed or not
  function isExist() {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email.toLowerCase() == suEmailInput.value.toLowerCase()) {
        suEmailInput.classList.replace("is-valid", "is-invalid");
        emailExistInp.classList.replace("d-none", "d-block");
        return true;
      }
    }
  }


  // Login Page


 function login() {

  for (let i = 0; i < allUsers.length; i++) {
    
    if (loginEmail.value == "" || loginPassword.value == "") {
        wrongAlert.classList.replace("d-none", "d-block");
        return false;
    }

    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email.toLowerCase() == loginEmail.value.toLowerCase() && allUsers[i].password == loginPassword.value) {
        localStorage.setItem("usersname", allUsers[i].name);
        loginBtn.firstElementChild.setAttribute("href","welcome.html");
        currentIndex = i;
      } else {
        wrongAlert.classList.replace("d-none", "d-block");
      }
      
    }
  }
  
}

function loginValidate() {
  wrongAlert.classList.replace("d-block", "d-none");
}


// Welcome Page

function displayWelcome() {
  document.getElementById("welcomeName").innerHTML = `welcome ${username.toUpperCase()}`;
}

function logout() {
  logoutBtn.firstElementChild.setAttribute("href", "index.html");
}

function deleteAcc() {

  allUsers.splice(currentIndex,1);
  localStorage.setItem("allUsers", JSON.stringify(allUsers));
  alert("Your Account is deleted, we are sad that you go.");
  deleteBtn.firstElementChild.setAttribute("href", "index.html");
}
  