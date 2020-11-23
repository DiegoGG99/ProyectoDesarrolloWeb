function registrar() {
  var email = document.getElementById("emailreg").value;
  var pass = document.getElementById("passreg").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, pass)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
}

function ingresar() {
  var email2 = document.getElementById("emaillog").value;
  var pass2 = document.getElementById("passlog").value;
  firebase
    .auth()
    .signInWithEmailAndPassword(email2, pass2)
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      alert("E-mail/Contraseña incorrectos");
      location.reload();
      return false;
      // ...
    });
}

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
      console.log("sin cuenta");
    }
  });
}
observador();

function crud() {
  var btn = document.getElementById("adminonly");
  btn.innerHTML = `<h5>Bienvenido de vuelta admin</h5>
  <a href="../CRUD.html" class="btn btn-primary">Ir al CRUD</a>`;
}

function noadmins() {
  var btn = document.getElementById("noadmins");
  btn.innerHTML = `<h5>Login exitoso ¡ Bienvenido!</h5>
  <a href="../index.html" class="btn btn-primary">Ir al inicio</a>
  <button class="btn" onclick="logout()">Cerrar Sesión</button>`;
  var reglog = document.getElementById("reglog");
  reglog.innerHTML = ``;
}

function logout() {
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("saliendo");
    })
    .catch(function (error) {
      console.log("error");
    });

  /*var reglog = document.getElementById("reglog");
  reglog.innerHTML = ` <div id="reglog">
  <div class="container-fluid" id="registerdiv">
    <h4>Registro de usuarios</h4>
    <input type ="email" id="emailreg" placeholder="Ingresa e-mail">
    <input type="password" id="passreg" placeholder="Ingresa contraseña"></br>
    <button class="btn" onclick="registrar()">Registrarse</button>
  </div>
  <div class="container-fluid" id="logindiv">
      <h4>Ingreso de usuarios</h4>
      <input type ="email" id="emaillog" placeholder="Ingresa e-mail">
      <input type="password" id="passlog" placeholder="Ingresa contraseña"></br>
      <button class="btn" onclick="ingresar()">Ingresar</button>
    </div>
</div>`;*/
  location.reload();
  return false;
}
