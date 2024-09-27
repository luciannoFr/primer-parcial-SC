import "./style.css";

// ! REALIZAR LA LÓGICA DE REGISTRO DE USUARIOS AQUÍ

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  
  // Realizar la petición POST a la API de registro con los datos del usuario
  fetch ("http://localhost:4321/auth/sign-up", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username: name,
        email: email,
        password: password,
      }),
  })
   .then((response) => {
      if (response.ok) {
        // REDIRIGIR AL USUARIO A LA PÁGINA DE INICIO DE SESIÓN
        window.location.href = "/client/pages/login.html";
      } else {
        // MOSTRAR UN MENSAJE DE ERROR AL USUARIO
        alert("Error al registrar el usuario");
        // Limpiar los campos del formulario
        registerForm.reset();
      }
    })
   .catch((error) => {
      console.error("Error:", error);
    });
});