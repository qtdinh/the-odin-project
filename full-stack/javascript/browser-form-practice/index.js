//1. regexp validation for zip
//set required (check for empty) for email, password and password confirm
const form = document.querySelector("form");
const email = document.getElementById("email-addr");
const emailError = document.querySelector("#email-addr + span.error");
const country = document.getElementById("country");
let selectedCountry = country.value;
const zipCode = document.getElementById("zip-code");
const zipCodeError = document.querySelector("#zip-code + span.error");
const passwordInput = document.getElementById("password");
const passwordConfirmation = document.getElementById("password-confirm");

email.addEventListener("input", (event) => {
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
  zipCodeError.textContent = "";
  zipCodeError.className = "error";
});

window.onload = () => {
  zipCode.oninput = showZIPError;
};

passwordInput;

form.addEventListener("submit", (event) => {
  if (!email.validity.valid) {
    // If it isn't, we display an appropriate error message
    showEmailError();
    // Then we prevent the form from being sent by canceling the event
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

function showZIPError() {
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
    // No need to do anything if the zip code is valid
    zipCode.setCustomValidity("");
    zipCodeError.textContent = "";
    zipCodeError.className = "error";
  } else {
    zipCode.setCustomValidity("red");
    zipCodeError.textContent = constraints[selectedCountry][1];
    zipCodeError.className = "error active";
  }
}
