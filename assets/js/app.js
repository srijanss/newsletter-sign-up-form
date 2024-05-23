const formWrapper = document.querySelector(".card");
const successMessageBlock = document.querySelector(".card__success");
const dismissMessageBtn = successMessageBlock.querySelector(
  ".card__success__dismiss-btn"
);
const recipientEmailEl = successMessageBlock.querySelector(
  ".card__success__recipient-email"
);
const signUpForm = document.getElementById("sign-up-form");
const emailFormGroup = signUpForm.querySelector(".card__form__group--email");
const emailInput = emailFormGroup.querySelector(
  '.card__form__input[type="email"]'
);
const emailInputErrorEl = emailFormGroup.querySelector(".error");

function toggleFormVisibility() {
  formWrapper.classList.toggle("inactive");
}
function toggleSuccessMessageVisibility(recipientEmail) {
  if (recipientEmail) {
    recipientEmailEl.textContent = recipientEmail;
  }
  successMessageBlock.classList.toggle("inactive");
}

function toggleFormAndSuccessMessageVisibility(recipientEmail) {
  setTimeout(() => {
    toggleFormVisibility();
    toggleSuccessMessageVisibility(recipientEmail);
  }, 200);
}

function toggleErrorMessage(inputEl, errorEL, errorMessage) {
  errorEL.textContent = errorMessage;
  if (errorMessage !== "") {
    inputEl.classList.add("invalid");
    errorEL.classList.add("active");
  } else {
    inputEl.classList.remove("invalid");
    errorEL.classList.remove("active");
  }
}

emailInput.addEventListener("focus", (e) => {
  toggleErrorMessage(emailInput, emailInputErrorEl, "");
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!emailInput.validity.valid) {
    toggleErrorMessage(emailInput, emailInputErrorEl, "Valid email required");
  } else {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    toggleErrorMessage(emailInput, emailInputErrorEl, "");
    toggleFormAndSuccessMessageVisibility(data.email);
  }
});

dismissMessageBtn.addEventListener("click", () => {
  emailInput.value = "";
  toggleFormAndSuccessMessageVisibility();
});
