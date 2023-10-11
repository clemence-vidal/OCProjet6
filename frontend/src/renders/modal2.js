import { stopPropagation } from "./modal1";

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
  if (imgInput.files.length === 0) {
    alert("Veuillez sélectionner une image.");
    return;
  }
  if (imgFile.size > maxSize) {
    alert("Votre image est trop volumineuse.");
    return;
  }
  if (!allowedFormats.some((format) => imgFileName.endsWith(format))) {
    alert("Votre image n'est pas au bon format (jpg, jpeg ou png).");
    return;
  }
  if (!imgFile) {
    alert("Veuillez choisir une image.");
    return;
  }
  if (
    imgFileName &&
    !allowedFormats.some((format) => imgFileName.endsWith(format))
  ) {
    alert("Votre image n'est pas au bon format (jpg, jpeg ou png).");
    imgInput.value = "";
    return;
  }
  if (titleInput.value === "") {
    alert("Veuillez renseigner un titre.");
    return;
  }
  if (categorySelect.value === "") {
    alert("Veuillez renseigner une catégorie.");
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
