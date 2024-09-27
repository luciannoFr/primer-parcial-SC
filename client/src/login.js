import "./style.css";

// Obtener el formulario de inicio de sesión
const $form = document.getElementById("login-form");

// Añadir un evento de submit al formulario

$form.addEventListener("submit", async (event) => {
  // Evitar que el formulario recargue la página
  event.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData($form);

  // Convertir el objeto FormData a un objeto plano
  const entries = Object.fromEntries(formData.entries());

    // ! REDIRIGIR AL USUARIO A LA PANTALLA PRINCIPAL
      fetch("http://localhost:4321/auth/sign-in", {
        method: "POST",
        credentials: "include", // Importante para enviar las cookies de sesión
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entries),
      }).then(async (response) => {
        if (response.ok) {
          // Obtener la sesión del usuario actual
          const user = await response.json();
          // Guardar la sesión del usuario en el local storage
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/pages/main";
        } else {
          // Mostrar un mensaje de error al usuario
          alert("Error al iniciar sesión. Por favor, intente de nuevo.");
          // Limpiar los campos del formulario
          $form.reset();
          // Desactivar el botón de envío
          $form.querySelector("button").disabled = true;
          // Activar el botón de envío después de 5 segundos
          setTimeout(() => {
            $form.querySelector("button").disabled = false;
          }, 5000);
        }
      });
});
