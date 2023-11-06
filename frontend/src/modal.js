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

// ouvrir la modale Ajout photo
const openModal2 = function (e) {
  e.preventDefault();
  modal = document.querySelector(".modal2");
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  modal.removeAttribute("aria-hidden");
  modal.setAttribute("aria-modal", "true");
  modal.addEventListener("click", closeModal2);
  modal
    .querySelector(".js-modal-close2")
    .addEventListener("click", closeModal2);
  modal
    .querySelector(".js-modal-stop2")
    .addEventListener("click", stopPropagation);
  getFilter().then((filter) => {
    if (filter) {
      const selectCategory = document.querySelector("#categorie");
      for (let f of filter) {
        const optionFilter = document.createElement("option");
        optionFilter.value = f.id;
        optionFilter.innerHTML = f.name;
        selectCategory.appendChild(optionFilter);
      }
    }
  });
  clearSelectOptions();
};

function clearSelectOptions() {
  const selectCategory = document.querySelector("#categorie");
  while (selectCategory.options.length > 1) {
    selectCategory.remove(1);
  }
}

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

// fermer la modale Ajout photo
const closeModal2 = function (e) {
  if (modal === null) return;
  e.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal2);
  modal
    .querySelector(".js-modal-close2")
    .removeEventListener("click", closeModal2);
  modal
    .querySelector(".js-modal-stop2")
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

// afficher les images de la galerie dans la Galerie photo
const modalWorks = document.querySelector(".works");

function showWorks(works) {
  const worksModal = document.createElement("div");
  modalWorks.appendChild(worksModal);
  modalWorks.innerHTML = "";
  for (let work of works) {
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.id = work.id;
    modalWorks.appendChild(img);
  }
  const images = modalWorks.querySelectorAll("img");
  images.forEach(function (image) {
    const imageWrapper = document.createElement("div");
    imageWrapper.className = "image-wrapper";
    image.parentNode.replaceChild(imageWrapper, image);
    imageWrapper.appendChild(image);
    const square = document.createElement("div");
    square.className = "square";
    square.id = image.id;
    imageWrapper.id = image.id;
    imageWrapper.insertBefore(square, image);
    square.addEventListener("click", deleteButton);
    const trashcan = document.createElement("i");
    trashcan.classList = "fa-solid fa-trash-can fa-sm";
    trashcan.id = image.id;
    square.appendChild(trashcan);
  });
}

// bouton suppression
function deleteButton(e) {
  e.preventDefault();
  const square = e.currentTarget;
  const imgId = square.id;
  const token = localStorage.getItem("token");
  const confirmation = window.confirm(
    "Êtes-vous sûr de vouloir supprimer cet élément?"
  );

  if (confirmation) {
    fetch(`http://localhost:5678/api/works/${imgId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("La photo a bien été supprimée.");
          getWorks().then((response) => {
            renderWorks(response);
            showWorks(response);
            console.log(response);
          });
        } else {
          alert("Erreur lors de la suppression");
        }
      })
      .catch((error) => {
        console.error("Erreur de réseau: ", error);
      });
  }
}

// bouton valider ajout d'image
function validateAddImage() {
  const token = localStorage.getItem("token");
  const imgInput = document.querySelector("#image");
  const titleInput = document.querySelector("#titre");
  const categorySelect = document.querySelector("#categorie");
  const imgFile = imgInput.files[0];
  const imgFileName = imgFile ? imgFile.name.toLowerCase() : null;
  const maxSize = 4 * 1024 * 1024;
  const allowedFormats = ["jpg", "jpeg", "png"];
  const title = titleInput.value;
  const category = categorySelect.value;
  const errorMessageImg = document.querySelector(".error-message-img");
  const errorMessageTitle = document.querySelector(".error-message-title");
  const errorMessageCategory = document.querySelector(
    ".error-message-category"
  );
  if (imgInput.files.length === 0) {
    errorMessageImg.style.display = "block";
    errorMessageImg.textContent = "Veuillez sélectionner une image.";
    setTimeout(() => {
      errorMessageImg.style.display = "none";
    }, 5000);
    return;
  }
  if (imgFile.size > maxSize) {
    errorMessageImg.style.display = "block";
    errorMessageImg.textContent = "Votre image est trop volumineuse.";
    setTimeout(() => {
      errorMessageImg.style.display = "none";
    }, 5000);
    return;
  }
  if (!allowedFormats.some((format) => imgFileName.endsWith(format))) {
    errorMessageImg.style.display = "block";
    errorMessageImg.textContent =
      "Votre image n'est pas au bon format (jpg, jpeg ou png).";
    setTimeout(() => {
      errorMessageImg.style.display = "none";
    }, 5000);
    return;
  }
  // if (!imgFile) {
  //   errorMessageImg.style.display = "block";
  //   errorMessageImg.textContent = "Veuillez sélectionner une image.";
  //   return;
  // }
  // if (
  //   imgFileName &&
  //   !allowedFormats.some((format) => imgFileName.endsWith(format))
  // ) {
  //   errorMessageImg.style.display = "block";
  //   errorMessageImg.textContent =
  //     "Votre image n'est pas au bon format (jpg, jpeg ou png).";
  //   return;
  // }
  if (titleInput.value === "") {
    errorMessageTitle.style.display = "block";
    errorMessageTitle.textContent = "Veuillez renseigner un titre.";
    setTimeout(() => {
      errorMessageTitle.style.display = "none";
    }, 5000);
    return;
  }
  if (categorySelect.value === "") {
    errorMessageCategory.style.display = "block";
    errorMessageCategory.textContent = "Veuillez renseigner une catégorie.";
    setTimeout(() => {
      errorMessageCategory.style.display = "none";
    }, 5000);
    return;
  }
  const formData = new FormData();
  formData.append("image", imgFile);
  formData.append("title", title);
  formData.append("category", category);
  fetch(`http://localhost:5678/api/works`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("La photo a bien été ajoutée.");
        const newFigure = document.createElement("figure");
        const newImage = document.createElement("img");
        const newFigcaption = document.createElement("figcaption");
        newImage.src = URL.createObjectURL(imgFile);
        newFigcaption.innerHTML = titleInput.value;
        document.querySelector(".gallery").appendChild(newFigure);
        newFigure.append(newImage, newFigcaption);
        document.querySelector(".add-img-form").reset();
        document.querySelector("output img").src =
          "./assets/icons/add-photo.png";
        // closeModal2(e);
      } else {
        alert("Quelque chose s'est mal passé.");
      }
    })
    .catch((error) => {});
}

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
  // let filter;
  document
    .querySelector(".container-button .submit-button")
    .addEventListener("click", validateAddImage);
});

window.addEventListener("keydown", function (e) {
  if (e.key === "Escape" || e.key === "Esc") closeModal(e);
  if (e.key === "Tab" && modal !== null) focusInModal(e);
});
