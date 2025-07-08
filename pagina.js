document.querySelector('.menu-toggle').addEventListener('click', function () {
    document.querySelector('.menu').classList.toggle('active');
});


// Manejar el envío del formulario
function submitForm(event) {
    event.preventDefault(); // Evitar que la página se recargue al enviar el formulario

    // Obtener los valores del formulario
    const form = event.target;
    const formData = {
        ID_Servicio: form.ID_Servicio.value,   // Cambiado para que coincida con el campo del HTML
        ID_Producto: form.ID_Producto.value,  // Asignar un valor por defecto o recuperarlo de otro campo si aplica
        ID_Barbero: form.ID_Barbero.value,   // Asignar un valor por defecto o recuperarlo de otro campo si aplica
        Nom_Cliente: form.Nom_Cliente.value,   // Cambiado para que coincida con el campo del HTML
        Correo: form.Correo.value,             // Cambiado para que coincida con el campo del HTML
        Telefono: form.Telefono.value,         // Cambiado para que coincida con el campo del HTML
        Fecha_Reserva: form.Fecha_Reserva.value,  // Cambiado para que coincida con el campo del HTML
        Descripcion: form.Descripcion.value    // Cambiado para que coincida con el campo del HTML
    };

    // Validar datos básicos (puedes personalizar estas validaciones)
    if (!formData.ID_Servicio || !formData.Nom_Cliente || !formData.Telefono || !formData.Correo || !formData.Fecha_Reserva) {
        alert('Por favor, completa todos los campos requeridos.');
        return;
    }

    // Enviar los datos a la API mediante fetch
    fetch('/api/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al reservar la cita. Intenta nuevamente.');
            }
        })
        .then(data => {
            alert(`¡Cita reservada con éxito!`);
            form.reset(); // Limpiar el formulario después de enviarlo
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Ocurrió un error al procesar la reserva.');
        });
}

async function cargarServicios() {
    try {
        const response = await fetch('/api/servicios');
        if (!response.ok) throw new Error('Error al cargar los servicios');
        const servicios = await response.json();

        // Referencia al elemento select
        const select = document.querySelector('select[name="ID_Servicio"]');

        // Agregar cada servicio como una opción
        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.ID_Servicio;
            option.textContent = servicio.Nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los servicios:', error);
        alert('Hubo un problema al cargar los servicios.');
    }
}
async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error(`Error al cargar los productos`);
        // Verificar el contenido de la respuesta antes de intentar convertirla a JSON
        const productos = await response.json();

        const select = document.querySelector('select[name="ID_Producto"]');
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.ID_Producto;
            option.textContent = producto.Nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los productos:', error);
        alert('Hubo un problema al cargar los productos.');
    }
}
async function cargarBarberia() {
    try {
        const response = await fetch('/api/barberos');
        if (!response.ok) throw new Error('Error al cargar los barberos');
        const barberos = await response.json();

        const select = document.querySelector('select[name="ID_Barbero"]');
        barberos.forEach(barbero => {
            const option = document.createElement('option');
            option.value = barbero.ID_Barbero;
            option.textContent = barbero.Nombre;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error al cargar los barberos:', error);
        alert('Hubo un problema al cargar los barberos.');
    }
}


document.addEventListener('DOMContentLoaded', async function () {
    try {
        console.log("Cargando Servicios...");
        await cargarServicios();
        console.log("Servicios cargados");

        console.log("Cargando Productos...");
        await cargarProductos();
        console.log("Productos cargados");

        console.log("Cargando Barberos...");
        await cargarBarberia();
        console.log("Barberos cargados");

    } catch (error) {
        console.error('Error en el proceso de carga:', error);
    }
});
