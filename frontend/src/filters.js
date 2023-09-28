const portfolio = document.querySelector("#portfolio");
const gallery = document.querySelector(".gallery");
const styleFilter = document.createElement("div");
const allFilter = document.createElement("div");
allFilter.innerHTML = "Tous";
styleFilter.className = "style-filters";
styleFilter.id = "style-filters-id";
allFilter.className = "filters active";
allFilter.id = "all";
portfolio.insertBefore(styleFilter, gallery);
styleFilter.appendChild(allFilter);

async function getFilter() {
  const response = await fetch(`http://localhost:5678/api/categories`);
  const filters = await response.json();
  return filters;
}

function createFilter(filter) {
  for (let f of filter) {
    const divFilter = document.createElement("div");
    divFilter.className = "filters";
    divFilter.id = divFilter.innerHTML = f.name;
    styleFilter.appendChild(divFilter);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  portfolio.addEventListener("click", (event) => {
    if (event.target.classList.contains("filters")) {
      if (event.target.classList.contains("active")) {
        event.target.classList.remove("active");
      } else {
        event.target.classList.add("active");
      }
    }
  });

  let filters;
  getFilter()
    .then((filtres) => {
      filters = filtres;
      createFilter(filters);
    })
    .catch((error) => window.alert("Something went wrong."));
});
