var username = document.querySelector("#username");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var rePassword = document.querySelector("#re-password");
var dob = document.getElementById("birthday");
const inputGender = document.querySelectorAll("input[name='gender']");
const position = document.getElementById("pos");
var introduce = document.querySelector("#intro");
var form = document.querySelector("form");
var user_list = document.querySelector("tbody");

function showError(input, message) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.add("error");
  small.innerText = message;
}
function showSuccess(input) {
  let parent = input.parentElement;
  let small = parent.querySelector("small");

  parent.classList.remove("error");
  small.innerText = "";
}
function checkEmptyError(listInput) {
  let isEmptyError = false;
  listInput.forEach((input) => {
    input.value = input.value.trim();

    if (!input.value) {
      showError(input, "Must be filled in");
    } else {
      showSuccess(input);
    }
  });
  return isEmptyError;
}
function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  if (regexEmail.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email Invalid");
  }
}
function checkLengthError(input, min, max) {
  input.value = input.value.trim();
  if (input.value.length < min) {
    showError(input, `Must be more than ${min} characters`);
  }
  if (input.value.length > max) {
    showError(input, `Must be less than ${max} characters`);
  }
}
function checkDay(input) {
  let birthDay = dob.value;
  if (birthDay == "") {
    showError(input, "Please choose day");
  } else {
    showSuccess(input);
  }
}
function checkMatchPassError(pass, rePass) {
  if (pass.value !== rePass.value) {
    showError(rePass, "Password does not match");
  }
}
function checkGender(input) {
  let isCheckGender = false;
  inputGender.forEach((item) => {
    const parentEl = item.parentElement;
    const initParentEl = parentEl.parentElement;
    const error = initParentEl.querySelector("#message-error");
    item.checked ? (isCheckGender = true) : isCheckGender;
    isCheckGender
      ? (error.innerText = "")
      : (error.innerText = "Must selected gender");
  });
  return isCheckGender;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkEmptyError([username, email, password, rePassword, introduce]);
  checkLengthError(username, 6, 10);
  checkLengthError(password, 6, 10);
  checkEmailError(email);
  checkMatchPassError(password, rePassword);
  checkDay(dob);
  checkGender(inputGender);

  let genderValue = "";
  for (gender of inputGender) {
    if (gender.checked) {
      genderValue = gender.value;
    }
  }
  user_list.innerHTML += `  
   <tr>
  <td>${username.value}</td>
  <td>${email.value}</td>
  <td>${password.value}</td>
  <td>${dob.value}</td>
  <td>${genderValue}</td>
  <td>${position.value}</td>
  <td>${introduce.value}</td>
  <td>
  <button class="delete">X</button>
  </td>
</tr>`;
  const resetInput = () => {
    username.value = "";
    email.value = "";
    password.value = "";
    rePassword.value = "";
    dob.value = "";
    introduce.value = "";
    position.value = "";
    inputGender.forEach((node) => {
      node.checked = false;
    });
  };
  resetInput();
});
