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
