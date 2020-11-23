const db = firebase.firestore();

const proyectscontainer = document.getElementById("proyectos-container");

const getproyect = () => db.collection("proyectos").get();
const getproyects = (id) => db.collection("proyectos").doc(id).get();
const ongetproyect = (callback) =>
  db.collection("proyectos").onSnapshot(callback);

window.addEventListener("DOMContentLoaded", async (e) => {
  ongetproyect((querySnapshot) => {
    proyectscontainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      const proyecto = doc.data();
      proyecto.id = doc.id;

      proyectscontainer.innerHTML += `<div class="col-md-4" category="${proyecto.category}">
            <div class="card">
              <div class="card-body">
              <img class="img-fluid" src="${proyecto.fileurl}"/>
                <p class="card-title">${proyecto.title}</p>
                <p> ${proyecto.category}</p>
                <a href="" class="btn btn-primary">Detalles</a>
              </div>
            </div>
         </div>`;
    });
  });
});
