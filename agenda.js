document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const contactTable = document.getElementById("contactTable").getElementsByTagName('tbody')[0];

    // Función para cargar la lista de contactos
    function cargarContactos() {
        fetch("http://www.raydelto.org/agenda.php", {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            // Limpiar la tabla
            contactTable.innerHTML = "";

            // Iterar a través de los contactos y agregarlos a la tabla
            data.forEach(contacto => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${contacto.nombre}</td>
                    <td>${contacto.apellido}</td>
                    <td>${contacto.telefono}</td>
                `;
                contactTable.appendChild(row);
            });
        })
        .catch(error => console.error("Error al cargar contactos:", error));
    }

    // Cargar la lista de contactos al cargar la página
    cargarContactos();

    // Manejar el envío del formulario para agregar nuevos contactos
    contactForm.addEventListener("submit", event => {
        event.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const apellido = document.getElementById("apellido").value;
        const telefono = document.getElementById("telefono").value;

        const nuevoContacto = {
            nombre,
            apellido,
            telefono
        };

        fetch("http://www.raydelto.org/agenda.php", {
            method: "POST",
            body: JSON.stringify(nuevoContacto),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("Contacto agregado exitosamente:", data);
            // Limpiar el formulario después de agregar el contacto
            contactForm.reset();
            // Recargar la lista de contactos
            cargarContactos();
        })
        .catch(error => console.error("Error al agregar contacto:", error));
    });
});
