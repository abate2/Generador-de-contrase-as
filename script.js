document.getElementById("userForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const color = document.getElementById("color").value.trim();
  const ciudad = document.getElementById("ciudad").value.trim();
  const animal = document.getElementById("animal").value.trim();

  const password = generarContrasena(color, ciudad, animal);
  
  document.getElementById("saludo").textContent = `Hola, ${nombre}!`;
  document.getElementById("password").value = password;
  document.getElementById("resultado").style.display = "block";

  evaluarFortaleza(password);
  guardarEnHistorial(password);
  mostrarHistorial();
});

function generarContrasena(color, ciudad, animal) {
  const simbolos = ["@", "#", "$", "%", "!"];
  const simbolo = simbolos[Math.floor(Math.random() * simbolos.length)];

  const parte1 = color.substring(0, 2).toLowerCase();
  const parte2 = ciudad.substring(0, 2).toUpperCase();
  const parte3 = animal.slice(-2);
  const numeroAleatorio = Math.floor(Math.random() * 900 + 100); // 100-999

  return `${parte1}${parte2}${parte3}${numeroAleatorio}${simbolo}`;
}

function evaluarFortaleza(pass) {
  let fuerza = 0;
  if (pass.length >= 8) fuerza++;
  if (/[A-Z]/.test(pass)) fuerza++;
  if (/[a-z]/.test(pass)) fuerza++;
  if (/[0-9]/.test(pass)) fuerza++;
  if (/[@#$%!]/.test(pass)) fuerza++;

  const mensaje = document.getElementById("strength");
  if (fuerza <= 2) {
    mensaje.textContent = "Fortaleza: Débil 🔴";
    mensaje.style.color = "red";
  } else if (fuerza === 3 || fuerza === 4) {
    mensaje.textContent = "Fortaleza: Media 🟠";
    mensaje.style.color = "orange";
  } else {
    mensaje.textContent = "Fortaleza: Fuerte 🟢";
    mensaje.style.color = "green";
  }
}

function copyPassword() {
  const passwordField = document.getElementById("password");
  passwordField.select();
  passwordField.setSelectionRange(0, 99999);
  document.execCommand("copy");
  document.getElementById("copyMsg").style.display = "block";
}

// 🌗 Cambiar tema manual
document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// 🌙 Modo oscuro automático después de las 6pm (Colombia)
window.onload = function () {
  const ahora = new Date();
  const hora = ahora.getHours();

  if (hora >= 18 || hora < 6) {
    document.body.classList.add("dark");
  }

  mostrarHistorial();
};

function guardarEnHistorial(password) {
  let historial = JSON.parse(localStorage.getItem("historialClaves")) || [];

  // Agregar nueva contraseña al inicio
  historial.unshift(password);

  // Limitar a solo 5 elementos
  if (historial.length > 5) {
    historial = historial.slice(0, 5);
  }

  localStorage.setItem("historialClaves", JSON.stringify(historial));
}

function mostrarHistorial() {
  const lista = document.getElementById("listaHistorial");
  lista.innerHTML = "";

  const historial = JSON.parse(localStorage.getItem("historialClaves")) || [];

  historial.forEach((clave, index) => {
    const li = document.createElement("li");
    li.textContent = `#${index + 1}: ${clave}`;
    lista.appendChild(li);
  });
}
