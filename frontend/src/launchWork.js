import { getWorks } from "./api/worksApi.js";
let works;
let filteredWorks = [];
let selectedFilters = [];

function renderWorks(works) {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  for (let work of works) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    figure.id = work.id;
    img.src = work.imageUrl;
    figcaption.innerHTML = work.title;
    gallery.appendChild(figure);
    figure.append(img, figcaption);
  }
}

function manageSelectedUnselected(isActive, category) {
  if (isActive) {
    selectedFilters.push(
      ...works.filter((work) => work.categoryId === category)
    );
    renderWorks(selectedFilters);
  } else {
    selectedFilters = selectedFilters.filter((n) => n.categoryId !== category);
    renderWorks(selectedFilters);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getWorks()
    .then((travaux) => {
      works = travaux;
      filteredWorks = works;
      renderWorks(filteredWorks);

      portfolio.addEventListener("click", (event) => {
        if (event.target.classList.contains("filters")) {
          let isActive = event.target.classList.contains("active");
          if (event.target.id === "Objets") {
            if (document.getElementById("all").classList.contains("active")) {
              selectedFilters = [];
              manageSelectedUnselected(isActive, 1);
              document.getElementById("all").classList.remove("active");
            } else {
              manageSelectedUnselected(isActive, 1);
              document.getElementById("all").classList.remove("active");
            }
          } else if (event.target.id === "Appartements") {
            if (document.getElementById("all").classList.contains("active")) {
              selectedFilters = [];
              manageSelectedUnselected(isActive, 2);
              document.getElementById("all").classList.remove("active");
            } else {
              manageSelectedUnselected(isActive, 2);
              document.getElementById("all").classList.remove("active");
            }
          } else if (event.target.id === "Hotels & restaurants") {
            if (document.getElementById("all").classList.contains("active")) {
              selectedFilters = [];
              manageSelectedUnselected(isActive, 3);
              document.getElementById("all").classList.remove("active");
            } else {
              manageSelectedUnselected(isActive, 3);
              document.getElementById("all").classList.remove("active");
            }
          } else if (event.target.id === "all") {
            selectedFilters = [];
            manageSelectedUnselected(isActive, 1);
            manageSelectedUnselected(isActive, 2);
            manageSelectedUnselected(isActive, 3);
            document.getElementById("Objets").classList.remove("active");
            document.getElementById("Appartements").classList.remove("active");
            document
              .getElementById("Hotels & restaurants")
              .classList.remove("active");
          }
        }
      });
    })
    .catch(() => window.alert("Il y a eu un problème."));
});
