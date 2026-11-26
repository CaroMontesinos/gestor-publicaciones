"use strict";

const API = "https://jsonplaceholder.typicode.com/posts";
// JSONPlaceholder entrega texto de relleno. Estos textos de ejemplo en español
// se asignan por ID después del GET y se editan mediante el PUT original.
const temas = [
    ["Estudio", "el hábito de estudiar", "revisa tus apuntes durante quince minutos"],
    ["Lectura", "la lectura diaria", "elige un cuento breve y anota lo que más te llamó la atención"],
    ["Huerto", "el cuidado de un huerto pequeño", "observa la luz que recibe cada maceta antes de regar"],
    ["Cocina", "la planificación de comidas", "elige una receta con los ingredientes que ya tienes"],
    ["Actividad física", "el movimiento diario", "elige una caminata corta que puedas incorporar a tu rutina"],
    ["Fotografía", "la fotografía cotidiana", "fotografía el mismo objeto con luz de mañana y de tarde"],
    ["Escritura", "la escritura personal", "describe una escena cotidiana en cinco líneas"],
    ["Reciclaje", "la separación de residuos", "revisa qué materiales recibe el punto limpio de tu comuna"],
    ["Organización", "el orden en casa", "clasifica el contenido de un cajón en grupos según su uso"],
    ["Ahorro", "el registro de gastos", "anota tus compras de la semana en una lista sencilla"]
];

const enfoques = [
    ["Primeros pasos", "Empieza por una acción que puedas realizar hoy."],
    ["Cómo preparar un espacio", "Deja a mano lo necesario y despeja la superficie que usarás."],
    ["Una meta para esta semana", "Define un objetivo pequeño y fija un día para revisar cómo te fue."],
    ["Qué anotar en un registro", "Apunta la fecha, lo que hiciste y lo que cambiarías la próxima vez."],
    ["Cómo retomar la rutina", "Si dejaste pasar algunos días, reserva un momento breve para volver a empezar."],
    ["Una práctica para compartir", "Invita a otra persona a probar la actividad contigo y comparen sus experiencias."],
    ["Cómo reconocer los avances", "Compara lo que puedes hacer hoy con lo que te costaba al principio."],
    ["Qué hacer cuando falta tiempo", "Reduce la actividad a una parte que puedas terminar en pocos minutos."],
    ["Cómo probar una variación", "Cambia un detalle de la actividad y observa si el resultado te sirve más."],
    ["Una revisión de fin de mes", "Revisa qué actividades repetiste y conserva las que te resultaron más fáciles de sostener."]
];

function adaptarPublicacion(post) {
    const posicion = post.id - 1;
    const [categoria, tema, ejemplo] = temas[posicion % temas.length];
    const [titulo, consejo] = enfoques[Math.floor(posicion / temas.length) % enfoques.length];

    return {
        ...post,
        title: `${categoria}: ${titulo}`,
        body: `Si quieres dedicar tiempo a ${tema}, prueba esta idea: ${ejemplo}. ${consejo}`
    };
}

const cargar = document.querySelector("#cargar");
const buscar = document.querySelector("#buscar");
const estado = document.querySelector("#estado");
const lista = document.querySelector("#lista");
const editor = document.querySelector("#editor");
const campos = editor.querySelector("fieldset");
const titulo = document.querySelector("#titulo");
const cuerpo = document.querySelector("#cuerpo");
const contador = document.querySelector("#contador");
const cancelar = document.querySelector("#cancelar");

let publicaciones = [];
let publicacionEditada = null;
let botonEdicion = null;

// Clic para cargar y entrada de texto para filtrar, incluida la opción de pegar.
cargar.addEventListener("click", cargarPublicaciones);
buscar.addEventListener("input", () => mostrarEstado(mostrarPublicaciones()));

// El teclado, los cambios de campo y el envío del formulario tienen tareas propias.
buscar.addEventListener("keydown", evento => {
    if (evento.key === "Escape" && buscar.value) {
        evento.preventDefault();
        buscar.value = "";
        mostrarEstado(mostrarPublicaciones());
    }
});
titulo.addEventListener("input", actualizarContador);
editor.addEventListener("change", evento => {
    if (evento.target === titulo || evento.target === cuerpo) {
        evento.target.value = evento.target.value.trim();
        actualizarContador();
    }
});
editor.addEventListener("submit", guardarCambios);
cancelar.addEventListener("click", () => {
    cerrarEditor();
    mostrarEstado("Edición cancelada.");
});

// Un solo controlador de clic para todos los botones de edición.
lista.addEventListener("click", evento => {
    const boton = evento.target.closest("button[data-id]");
    if (!boton || cargar.disabled) return;

    const post = publicaciones.find(item => item.id === Number(boton.dataset.id));
    if (post) abrirEditor(post, boton);
});

if (typeof window.fetch !== "function") {
    cargar.disabled = true;
    mostrarEstado("Este navegador no admite Fetch. Abre la página en un navegador actualizado.", true);
}

function mostrarEstado(mensaje, error = false) {
    estado.textContent = mensaje;
    estado.dataset.error = String(error);
}

async function solicitarJSON(url, opciones) {
    let respuesta;

    try {
        respuesta = await fetch(url, opciones);
    } catch {
        throw new Error("No se pudo conectar con el servicio. Revisa la conexión e inténtalo de nuevo.");
    }

    if (!respuesta.ok) {
        throw new Error(`El servidor respondió con un error HTTP ${respuesta.status}.`);
    }

    try {
        return await respuesta.json();
    } catch {
        throw new Error("El servidor devolvió una respuesta que no es JSON válido.");
    }
}

function esPublicacion(dato) {
    return dato && Number.isInteger(dato.id) && dato.id > 0
        && Number.isInteger(dato.userId)
        && typeof dato.title === "string" && typeof dato.body === "string";
}

async function cargarPublicaciones() {
    cargar.disabled = true;
    buscar.disabled = true;
    mostrarEstado("Cargando publicaciones…");

    try {
        const datos = await solicitarJSON(API, { method: "GET" });
        if (!Array.isArray(datos) || !datos.every(esPublicacion)) {
            throw new Error("El JSON recibido no tiene el formato de una lista de publicaciones.");
        }
        publicaciones = datos.map(adaptarPublicacion);
        mostrarEstado(mostrarPublicaciones());
    } catch (error) {
        mostrarEstado(`No se pudieron cargar las publicaciones. ${error.message}`, true);
    } finally {
        cargar.disabled = false;
        buscar.disabled = publicaciones.length === 0;
    }
}

function mostrarPublicaciones() {
    const texto = buscar.value.trim().toLowerCase();
    const visibles = publicaciones.filter(post => post.title.toLowerCase().includes(texto));
    const tarjetas = document.createDocumentFragment();

    for (const post of visibles) {
        const tarjeta = document.createElement("article");
        tarjeta.className = "tarjeta";
        const encabezado = document.createElement("h2");
        encabezado.textContent = post.title;
        const parrafo = document.createElement("p");
        parrafo.textContent = post.body;
        const boton = document.createElement("button");
        boton.type = "button";
        boton.dataset.id = post.id;
        boton.textContent = "Editar publicación";
        boton.setAttribute("aria-label", `Editar publicación: ${post.title}`);
        tarjeta.append(encabezado, parrafo, boton);
        tarjetas.append(tarjeta);
    }

    lista.textContent = "";
    lista.append(tarjetas);
    return visibles.length
        ? `Publicaciones visibles: ${visibles.length} de ${publicaciones.length}.`
        : "No se encontraron publicaciones.";
}

function abrirEditor(post, boton) {
    publicacionEditada = post;
    botonEdicion = boton;
    titulo.value = post.title;
    cuerpo.value = post.body;
    actualizarContador();
    cargar.disabled = true;
    buscar.disabled = true;
    editor.hidden = false;
    titulo.focus();
}

function actualizarContador() {
    contador.textContent = `${titulo.value.length} de ${titulo.maxLength} caracteres`;
}

function cerrarEditor() {
    editor.hidden = true;
    publicacionEditada = null;
    cargar.disabled = false;
    buscar.disabled = false;

    if (botonEdicion && botonEdicion.isConnected) {
        botonEdicion.focus();
    } else {
        buscar.focus();
    }
    botonEdicion = null;
}

async function guardarCambios(evento) {
    evento.preventDefault();
    if (!publicacionEditada || campos.disabled) return;

    const datos = {
        id: publicacionEditada.id,
        userId: publicacionEditada.userId,
        title: titulo.value.trim(),
        body: cuerpo.value.trim()
    };
    if (!datos.title || !datos.body || datos.title.length > titulo.maxLength) {
        mostrarEstado("Escribe un título de hasta 180 caracteres y completa el contenido.", true);
        return;
    }

    campos.disabled = true;
    mostrarEstado("Guardando cambios…");

    try {
        const actualizada = await solicitarJSON(`${API}/${datos.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });
        if (!esPublicacion(actualizada) || actualizada.id !== datos.id) {
            throw new Error("La respuesta JSON no coincide con la publicación editada.");
        }

        const indice = publicaciones.indexOf(publicacionEditada);
        publicaciones[indice] = actualizada;
        const resumen = mostrarPublicaciones();
        botonEdicion = lista.querySelector(`button[data-id="${datos.id}"]`);
        cerrarEditor();
        mostrarEstado(`Publicación actualizada. ${resumen}`);
    } catch (error) {
        mostrarEstado(`No se pudieron guardar los cambios. ${error.message}`, true);
    } finally {
        campos.disabled = false;
        if (!editor.hidden) titulo.focus();
    }
}
