let modal = null;
const focusableSelector = "button, label, input, select";
let focusables = [];

// ouvrir la modale Galerie photo
const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(".modal");
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
  getWorks().then((response) => {
    showWorks(response);
  });
};

// fermer la modale Galerie photo
const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

// pour focus input, button, etc
const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  index++;
  if (index >= focusables.length) {
    index = 0;
  }
  focusables[index].focus();
};

// ajouter l'affichage de l'image sur la fenêtre modale
const input = document.querySelector(".works-modal input");
const output = document.querySelector(".works-modal output");
let selectedImage = null;
input.addEventListener("change", function () {
  const file = input.files[0];
  if (file) {
    selectedImage = file;
    displayImage();
  }
});
function displayImage() {
  if (selectedImage) {
    const img = document.querySelector(".works-modal img");
    img.innerHTML = "";
    img.src = URL.createObjectURL(selectedImage);
    output.appendChild(img);
  }
}

document.addEventListener("DOMContentLoaded", function (e) {
  e.preventDefault();
  document.querySelector(".js-modal").addEventListener("click", openModal);
  document.querySelector(".add-button").addEventListener("click", function (e) {
    closeModal(e);
    openModal2(e);
  });
  document
    .querySelector(".return-modal1")
    .addEventListener("click", function (e) {
      closeModal2(e);
      openModal(e);
    });
  getWorks();
  document
    .querySelector(".container-button .submit-button")
    .addEventListener("click", validateAddImage);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") closeModal(e);
  if (e.key === "Tab" && modal !== null) focusInModal(e);
});
