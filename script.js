const eventos = [
    {
        titulo: "¡Hora de practicar! 🧠",
        mensaje: "Tienes una nueva actividad disponible."
    },
    {
        titulo: "Nuevo evento 🚀",
        mensaje: "Hay algo nuevo esperando."
    },
    {
        titulo: "Recordatorio ⏰",
        mensaje: "No olvides revisar el sistema."
    }
];

function actualizar() {

    const evento =
        eventos[Math.floor(Math.random() * eventos.length)];

    document.getElementById("eventTitle").textContent =
        evento.titulo;

    document.getElementById("eventMessage").textContent =
        evento.mensaje;

    const ahora = new Date();

    document.getElementById("time").textContent =
        ahora.toLocaleTimeString();

    document.getElementById("statusText").textContent =
        "Sistema activo";

    document.getElementById("statusDot").style.background =
        "#4ade80";
}

actualizar();