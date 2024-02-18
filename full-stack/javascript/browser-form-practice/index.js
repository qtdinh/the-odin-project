//1. regexp validation for zip
//set required (check for empty) for email, password and password confirm
const form = document.querySelector("form");
const email = document.getElementById("email-addr");
const emailError = document.querySelector("#email-addr + span.error");
const country = document.getElementById("country");
let selectedCountry = country.value;
const zipCode = document.getElementById("zip-code");
const zipCodeError = document.querySelector("#zip-code + span.error");
const password = document.getElementById("password");
const passwordError = document.querySelector("#password + span.error");
const passwordConfirmation = document.getElementById("password-confirm");
const confirmError = document.querySelector("#password-confirm + span.error");

email.addEventListener("input", () => {
  if (email.validity.valid) {
    //Remove error message if field happens to be valid
    emailError.textContent = ""; // Reset the content of the message
    emailError.className = "error"; // Reset the visual state of the message
  } else {
    // If there is still an error, show the correct error
    showEmailError();
  }
});

country.addEventListener("change", () => {
  selectedCountry = country.value;
  resetError(zipCode, zipCodeError);
});

window.onload = () => {
  zipCode.oninput = checkZIP;
};

password.addEventListener("input", () => {
  const errorMessage = validatePassword(); // Get error message
  if (errorMessage) {
    password.setCustomValidity("red");
  } else {
    resetError(password, passwordError); // Reset error state if there is no error message
  }
});

passwordConfirmation.addEventListener("input", () => {
  const errorMessage = validatePasswordMatch(); // Get error message
  if (errorMessage) {
    passwordConfirmation.setCustomValidity("red");
  } else {
    resetError(passwordConfirmation, confirmError); // Reset error state if there is no error message
  }
});

form.addEventListener("submit", (event) => {
  let isValid = true;

  if (!email.validity.valid) {
    showEmailError();
    isValid = false;
  }

  if (!zipCode.validity.valid) {
    checkZIP();
    isValid = false;
  }

  if (validatePassword()) {
    isValid = false;
  }

  if (validatePasswordMatch()) {
    isValid = false;
  }

  if (!isValid) {
    event.preventDefault();
  }
});

function showEmailError() {
  //cases for error messages

  if (email.validity.valueMissing) {
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Invalid email format.";
  }

  emailError.className = "error active";
}

function validatePassword() {
  if (password.validity.valueMissing) {
    passwordError.textContent = "You need to enter a password.";
    passwordError.className = "error active";
    return true;
  } else if (password.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    passwordError.className = "error active";
    return true;
  } else {
    return false;
  }
}

function validatePasswordMatch() {
  if (passwordConfirmation.validity.valueMissing) {
    confirmError.textContent = "You must re-enter your password.";
    confirmError.className = "error active";
    return true;
  } else if (password.value != passwordConfirmation.value) {
    confirmError.textContent = "The passwords don't match.";
    confirmError.className = "error active";
    return true;
  } else if (!password.validity.valid) {
    confirmError.textContent = "";
    confirmError.className = "error";
    return true;
  } else {
    return false;
  }
}

function checkZIP() {
  //set an object for constraints
  const constraints = {
    cn: [
      //^ means start of the literal in regex
      //? is used to signify that it's optional, it may appear 0 or once
      //use slash as an escape character
      // \d{6} and then this means any digit but it must be exactly 6 of them
      "^(CN-)?\\d{6}",
      "China ZIPs must have exactly 6 digits: e.g. CN-200600 or 200600",
    ],
    fi: [
      "^(FI-)?\\d{5}",
      "Finland ZIPs must have exactly 5 digits: e.g. FI-12000 or 12000",
    ],
    us: [
      "^(US-)?\\d{5}(-\\d{4})?",
      "USA ZIPs must have exactly 5 digits, optionally followed by 4 digits: e.g. US-90100, 90100, US-90100-2000 or 90100-2000",
    ],
    vn: [
      "^(VN-)?\\d{5}",
      "Vietnam ZIPs must have exactly 5 digits: e.g. VN-21000 or 21000",
    ],
  };

  const constraint = new RegExp(constraints[selectedCountry][0], "");

  if (constraint.test(zipCode.value)) {
    resetError(zipCode, zipCodeError);
    return false;
  } else {
    setError(zipCode, zipCodeError, constraints[selectedCountry][1]);
    return true;
  }
}

function setError(input, error, text) {
  input.setCustomValidity(text);
  error.textContent = text;
  error.className = "error active";
}

function resetError(input, error) {
  input.setCustomValidity("");
  error.textContent = "";
  error.classList.remove("active");
}
