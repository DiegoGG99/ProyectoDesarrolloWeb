const db = firebase.firestore();

const proyectform = document.getElementById("proyect-form");
const proyectscontainer = document.getElementById("proyects-container");

let editstatus = false;
let id = "";
const saveproyect = (title, description, category, fileurl) =>
  db.collection("proyectos").doc().set({
    title,
    description,
    category,
    fileurl
  });

async function uploadimage(file) {
  const ref = firebase.storage().ref();
  const name = new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type
  };
  const snapshot = await ref.child(name).put(file, metadata);
  const url = await snapshot.ref.getDownloadURL();
  return url;
}

const getproyect = () => db.collection("proyectos").get();
const getproyects = (id) => db.collection("proyectos").doc(id).get();
const ongetproyect = (callback) =>
  db.collection("proyectos").onSnapshot(callback);
const deleteproyect = (id) => db.collection("proyectos").doc(id).delete();
const updateproyect = (id, updatedproyect) =>
  db.collection("proyectos").doc(id).update(updatedproyect);

window.addEventListener("DOMContentLoaded", async (e) => {
  ongetproyect((querySnapshot) => {
    proyectscontainer.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      const proyecto = doc.data();
      proyecto.id = doc.id;
      if (!proyecto.fileurl) {
        proyecto.fileurl =
          "https://firebasestorage.googleapis.com/v0/b/fb-crud-5ba4b.appspot.com/o/imgplaceholder.gif?alt=media&token=5136550c-4207-4cca-872f-222ba906336b";
      }
      proyectscontainer.innerHTML += `<div class="card card-body mt-2 border-primary">
               <h5> ${proyecto.title} </h5>
               <p> ${proyecto.description}</p>
               <img class="img-fluid" src="${proyecto.fileurl}"/>
               <p> ${proyecto.category}</p>
               <div>
                <button class="btn btn-primary btn-delete" data-id="${proyecto.id}">Eliminar</button>
                <button class="btn btn-secondary btn-edit" data-id="${proyecto.id}">Editar</button>
               </div>
            </div>`;

      const btnsdelete = document.querySelectorAll(".btn-delete");
      console.log(btnsdelete);
      btnsdelete.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          await deleteproyect(e.target.dataset.id);
        });
      });

      const btnsedit = document.querySelectorAll(".btn-edit");
      btnsedit.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
          const proyect = await getproyects(e.target.dataset.id);
          editstatus = true;
          id = proyect.id;
          console.log(proyect.data());
          proyectform["proyect-title"].value = proyect.data().title;
          proyectform["proyect-description"].value = proyect.data().description;
          proyectform["category"].value = proyect.data().category;
          proyectform["btn-proyect-form"].innerText = "Actualizar";
        });
      });
    });
  });
});

proyectform.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = proyectform["proyect-title"];
  const description = proyectform["proyect-description"];
  const category = proyectform["category"];
  const file = proyectform["proyect-image"].files[0];
  let fileurl = null;

  if (file) {
    fileurl = await uploadimage(file);
  }
  if (!editstatus) {
    await saveproyect(title.value, description.value, category.value, fileurl);
  } else {
    if (file) {
      await updateproyect(id, {
        title: title.value,
        description: description.value,
        category: category.value,
        fileurl: fileurl
      });
    } else {
      await updateproyect(id, {
        title: title.value,
        description: description.value,
        category: category.value
      });
    }

    editstatus = false;
    proyectform["btn-proyect-form"].innerText = "Guardar";
    id = "";
  }
  getproyect();
  proyectform.reset();
  title.focus();
});
