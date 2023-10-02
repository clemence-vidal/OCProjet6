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
    return response.json();
    // console.log(response.json());
    //
  } catch (err) {
    console.log(err);
  }
}

userLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  login(email.value, password.value).then((response) => {
    console.log(response);
    if (response.token) {
      localStorage.setItem("token", response.token);
      window.location.href = "index.html";
    } else {
      // if (response.status === 404 || response.status === 401) {
      errorMessage.style.display = "block";
      errorMessage.textContent =
        "Veuillez vérifier les informations renseignées";
    }
    // }
  });
});
