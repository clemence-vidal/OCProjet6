const email = document.querySelector("#email");
const password = document.querySelector("#password");
const userLogin = document.querySelector(".user-login");
const errorMessage = document.querySelector(".error-message");

async function login(email, password) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    if (response.ok) {
      return response.json();
    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent =
        "Veuillez vérifier les informations renseignées";
    }
  } catch (err) {
    console.log(err);
  }
}

userLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  login(email.value, password.value).then((response) => {
    localStorage.setItem("token", response.token);
    window.location.href = "index.html";
  });
});

//logout
const token = localStorage.getItem("token");
const loginBtn = document.querySelector(".login-btn");
const styleFiltersId = document.querySelector("#style-filters-id");
const editionMode = document.querySelector(".edition-mode");
const modify = document.querySelector(".js-modal");

if (token) {
  loginBtn.textContent = "logout";
  styleFiltersId.style.display = "none";
} else {
  editionMode.style.display = "none";
  modify.style.display = "none";
}

loginBtn.addEventListener("click", () => {
  if (token) {
    localStorage.removeItem("token");
    window.location.reload();
  }
});
