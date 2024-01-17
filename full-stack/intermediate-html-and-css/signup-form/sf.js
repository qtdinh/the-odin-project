function checkPassword() {
    const password = document.getElementById("password");
    const confirmPass = document.getElementById("confirm-password");

    if(password.value === confirmPass.value) {
        password.setCustomValidity("");
        confirmPass.setCustomValidity("");
        document.querySelector(".help-text").textContent = "";
    } else {
        password.setCustomValidity("Passwords do not match");
        confirmPass.setCustomValidity("Passwords do not match");
        document.querySelector(".help-text").textContent = "*Passwords do not match";
    }
    
};