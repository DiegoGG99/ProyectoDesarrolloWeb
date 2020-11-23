function observador() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      noadmins();
      console.log("eres usuario");
      if (user.email === "admindiego@up.edu.mx") {
        console.log("eres admin");
        crud();
      }
    } else {
      noadmins();
      console.log("sin cuenta");
    }
  });
}
observador();

function noadmins() {
  var btn = document.getElementById("noadmins");
  var crud = document.getElementById("adminonly");
  crud.style.display = "none";
  btn.innerHTML = `<h5>CRUD</h5>
  <a href="../index.html" class="btn btn-primary">Ir al inicio</a>`;
}

function crud() {
  var btn = document.getElementById("adminonly");
  btn.style.display = "block";
}
