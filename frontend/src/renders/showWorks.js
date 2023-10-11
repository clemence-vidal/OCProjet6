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
