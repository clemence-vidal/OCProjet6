// bouton suppression modale 1
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
          // renderWorks(works);
        } else {
          alert("Erreur lors de la suppression");
        }
      })
      .catch((error) => {
        console.error("Erreur de réseau: ", error);
      });
  }
}
