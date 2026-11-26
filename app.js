"use strict";

const API = "https://jsonplaceholder.typicode.com/posts";
// JSONPlaceholder entrega texto de relleno. Estos textos de ejemplo en español
// se asignan por ID después del GET y se editan mediante el PUT original.
const publicacionesEnEspanol = [
    [
        "Estudio",
        "Repasa con preguntas en vez de releer",
        "Cierra el cuaderno y responde tres preguntas sobre la materia. Abre tus apuntes para comprobar en qué te equivocaste."
    ],
    [
        "Lectura",
        "Elige tu próximo libro en diez minutos",
        "Lee la primera página de tres libros. Quédate con el que te deje con ganas de saber qué ocurre después."
    ],
    [
        "Huerto",
        "Cultiva albahaca en una maceta",
        "Busca un lugar luminoso y una maceta con drenaje. Toca la tierra antes de regar para saber si todavía está húmeda."
    ],
    [
        "Cocina",
        "Prepara un almuerzo con lo que tienes",
        "Revisa la despensa y el refrigerador. Elige una base, como arroz o legumbres, y combínala con las verduras que tengas."
    ],
    [
        "Actividad física",
        "Incorpora una caminata a tu jornada",
        "Elige un trayecto que ya haces con frecuencia. Si te resulta cómodo, recorre a pie un tramo y ajusta la distancia a tu ritmo."
    ],
    [
        "Fotografía",
        "Aprovecha la luz de una ventana",
        "Coloca un objeto cerca de la ventana y muévelo hasta que la sombra tenga el contraste que buscas."
    ],
    [
        "Escritura",
        "Describe una escena en cinco líneas",
        "Elige un lugar conocido y menciona un sonido, un objeto y un movimiento. Esos detalles ayudan al lector a imaginar la escena."
    ],
    [
        "Reciclaje",
        "Prepara tus envases para llevarlos al punto limpio",
        "Consulta qué recibe el punto limpio de tu comuna. Separa los envases aceptados y entrégalos según las indicaciones del lugar."
    ],
    [
        "Organización",
        "Ordena el cajón que más usas",
        "Vacía el cajón y agrupa los objetos por función. Deja delante lo que necesitas a diario."
    ],
    [
        "Ahorro",
        "Registra tus gastos pequeños",
        "Anota las compras menores de la semana. Al agruparlas por tipo, podrás ver cuáles se repiten con mayor frecuencia."
    ],
    [
        "Estudio",
        "Divide un trabajo largo en tareas breves",
        "Divide un trabajo largo en tareas breves. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Lectura",
        "Lee un cuento durante tu pausa",
        "Lee un cuento durante tu pausa. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Huerto",
        "Elige macetas que drenen bien",
        "Elige macetas que drenen bien. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Cocina",
        "Planea tres cenas con una lista corta",
        "Planea tres cenas con una lista corta. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Actividad física",
        "Encuentra una ruta que disfrutes",
        "Encuentra una ruta que disfrutes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Fotografía",
        "Retrata un objeto desde tres ángulos",
        "Retrata un objeto desde tres ángulos. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Escritura",
        "Abre un relato con una acción concreta",
        "Abre un relato con una acción concreta. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Reciclaje",
        "Reconoce los símbolos de los envases",
        "Reconoce los símbolos de los envases. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Organización",
        "Asigna un lugar fijo para las llaves",
        "Asigna un lugar fijo para las llaves. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Ahorro",
        "Revisa las suscripciones que utilizas",
        "Revisa las suscripciones que utilizas. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Estudio",
        "Explica una idea con tus propias palabras",
        "Explica una idea con tus propias palabras. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Lectura",
        "Compara dos finales de novela",
        "Compara dos finales de novela. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Huerto",
        "Reconoce cuándo la tierra necesita agua",
        "Reconoce cuándo la tierra necesita agua. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Cocina",
        "Prepara una ensalada con contrastes",
        "Prepara una ensalada con contrastes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Actividad física",
        "Haz una pausa activa entre tareas",
        "Haz una pausa activa entre tareas. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Fotografía",
        "Compón la imagen con espacio libre",
        "Compón la imagen con espacio libre. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Escritura",
        "Escribe un diálogo entre dos voces",
        "Escribe un diálogo entre dos voces. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Reciclaje",
        "Separa los papeles secos de los húmedos",
        "Separa los papeles secos de los húmedos. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Organización",
        "Organiza los cables del escritorio",
        "Organiza los cables del escritorio. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Ahorro",
        "Define una meta para el mes",
        "Define una meta para el mes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Estudio",
        "Organiza tu semana según las fechas de entrega",
        "Organiza tu semana según las fechas de entrega. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Lectura",
        "Anota una frase para recordar el libro",
        "Anota una frase para recordar el libro. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Huerto",
        "Siembra rabanitos en un recipiente",
        "Siembra rabanitos en un recipiente. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Cocina",
        "Aprovecha el pan del día anterior",
        "Aprovecha el pan del día anterior. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Actividad física",
        "Agenda una caminata con compañía",
        "Agenda una caminata con compañía. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Fotografía",
        "Compara las sombras de mañana y tarde",
        "Compara las sombras de mañana y tarde. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Escritura",
        "Revisa los verbos de tu primer borrador",
        "Revisa los verbos de tu primer borrador. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Reciclaje",
        "Organiza un lugar para separar residuos",
        "Organiza un lugar para separar residuos. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Organización",
        "Clasifica los documentos importantes",
        "Clasifica los documentos importantes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Ahorro",
        "Distingue gastos fijos y variables",
        "Distingue gastos fijos y variables. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Estudio",
        "Prepara un mapa de conceptos antes de la prueba",
        "Prepara un mapa de conceptos antes de la prueba. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Lectura",
        "Prueba una novela fuera de tu género habitual",
        "Prueba una novela fuera de tu género habitual. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Huerto",
        "Cambia una planta a una maceta más amplia",
        "Cambia una planta a una maceta más amplia. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Cocina",
        "Combina legumbres con verduras de temporada",
        "Combina legumbres con verduras de temporada. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Actividad física",
        "Registra cómo te sientes al moverte",
        "Registra cómo te sientes al moverte. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Fotografía",
        "Prueba un encuadre a la altura del suelo",
        "Prueba un encuadre a la altura del suelo. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Escritura",
        "Recorta palabras de una descripción",
        "Recorta palabras de una descripción. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Reciclaje",
        "Busca un punto de entrega para pilas usadas",
        "Busca un punto de entrega para pilas usadas. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Organización",
        "Haz espacio para la ropa de temporada",
        "Haz espacio para la ropa de temporada. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Ahorro",
        "Compara precios por unidad",
        "Compara precios por unidad. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Estudio",
        "Haz tarjetas con errores frecuentes",
        "Haz tarjetas con errores frecuentes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Lectura",
        "Comenta un capítulo con otra persona",
        "Comenta un capítulo con otra persona. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Huerto",
        "Ubica cada planta según la luz que necesita",
        "Ubica cada planta según la luz que necesita. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Cocina",
        "Usa hierbas para cambiar un plato habitual",
        "Usa hierbas para cambiar un plato habitual. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Actividad física",
        "Alterna trayectos cortos en la semana",
        "Alterna trayectos cortos en la semana. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Fotografía",
        "Encuentra un fondo que destaque el sujeto",
        "Encuentra un fondo que destaque el sujeto. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Escritura",
        "Cambia el punto de vista de tu escena",
        "Cambia el punto de vista de tu escena. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Reciclaje",
        "Identifica qué tapas recibe tu punto limpio",
        "Identifica qué tapas recibe tu punto limpio. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Organización",
        "Ordena la entrada de tu casa",
        "Ordena la entrada de tu casa. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Ahorro",
        "Planifica una compra con anticipación",
        "Planifica una compra con anticipación. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Estudio",
        "Reparte el repaso en varios días",
        "Reparte el repaso en varios días. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Lectura",
        "Crea una lista de autores por descubrir",
        "Crea una lista de autores por descubrir. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Huerto",
        "Etiqueta tus siembras con la fecha",
        "Etiqueta tus siembras con la fecha. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Cocina",
        "Arma una despensa para resolver cenas rápidas",
        "Arma una despensa para resolver cenas rápidas. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Actividad física",
        "Elige un horario cómodo para salir",
        "Elige un horario cómodo para salir. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Fotografía",
        "Cuenta una historia en tres imágenes",
        "Cuenta una historia en tres imágenes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Escritura",
        "Convierte un recuerdo en una escena",
        "Convierte un recuerdo en una escena. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Reciclaje",
        "Planifica la entrega de aparatos en desuso",
        "Planifica la entrega de aparatos en desuso. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Organización",
        "Simplifica la mesa de trabajo",
        "Simplifica la mesa de trabajo. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Ahorro",
        "Aparta dinero para un gasto anual",
        "Aparta dinero para un gasto anual. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Estudio",
        "Prepara preguntas para tu grupo de estudio",
        "Prepara preguntas para tu grupo de estudio. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Lectura",
        "Explora el catálogo de tu biblioteca",
        "Explora el catálogo de tu biblioteca. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Huerto",
        "Observa qué insectos visitan tus plantas",
        "Observa qué insectos visitan tus plantas. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Cocina",
        "Prueba una salsa sencilla para las verduras",
        "Prueba una salsa sencilla para las verduras. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Actividad física",
        "Busca un espacio cubierto para días de lluvia",
        "Busca un espacio cubierto para días de lluvia. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Fotografía",
        "Fotografía texturas del barrio",
        "Fotografía texturas del barrio. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Escritura",
        "Dale a cada párrafo una idea central",
        "Dale a cada párrafo una idea central. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Reciclaje",
        "Clasifica los envases después de una reunión",
        "Clasifica los envases después de una reunión. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Organización",
        "Reúne los útiles que usas para estudiar",
        "Reúne los útiles que usas para estudiar. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Ahorro",
        "Revisa tus compras antes de repetirlas",
        "Revisa tus compras antes de repetirlas. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Estudio",
        "Cierra cada sesión con un resumen breve",
        "Cierra cada sesión con un resumen breve. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Lectura",
        "Identifica quién narra la historia",
        "Identifica quién narra la historia. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Huerto",
        "Dibuja un plano de tus macetas",
        "Dibuja un plano de tus macetas. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Cocina",
        "Diseña un menú semanal con ingredientes comunes",
        "Diseña un menú semanal con ingredientes comunes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Actividad física",
        "Prueba un recorrido urbano con paradas",
        "Prueba un recorrido urbano con paradas. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Fotografía",
        "Guarda una serie con un tema en común",
        "Guarda una serie con un tema en común. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Escritura",
        "Lee en voz alta para revisar el ritmo",
        "Lee en voz alta para revisar el ritmo. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Reciclaje",
        "Reutiliza frascos para ordenar materiales",
        "Reutiliza frascos para ordenar materiales. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Organización",
        "Revisa los objetos que guardas por costumbre",
        "Revisa los objetos que guardas por costumbre. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Ahorro",
        "Anota los gastos imprevistos del mes",
        "Anota los gastos imprevistos del mes. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Estudio",
        "Identifica qué tema merece otro repaso",
        "Identifica qué tema merece otro repaso. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Lectura",
        "Recomienda un libro en tres frases",
        "Recomienda un libro en tres frases. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Huerto",
        "Anota qué plantas crecen mejor en tu balcón",
        "Anota qué plantas crecen mejor en tu balcón. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Cocina",
        "Adapta una receta al número de porciones",
        "Adapta una receta al número de porciones. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Actividad física",
        "Reconoce qué actividades disfrutas más",
        "Reconoce qué actividades disfrutas más. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Fotografía",
        "Selecciona las mejores imágenes de una salida",
        "Selecciona las mejores imágenes de una salida. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Escritura",
        "Prueba dos cierres para el mismo cuento",
        "Prueba dos cierres para el mismo cuento. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ],
    [
        "Reciclaje",
        "Crea una lista de puntos limpios de tu sector",
        "Crea una lista de puntos limpios de tu sector. Prueba la idea en una sesión breve y registra qué te resultó más sencillo."
    ],
    [
        "Organización",
        "Prepara una rutina breve para ordenar al final del día",
        "Prepara una rutina breve para ordenar al final del día. Anota el resultado y decide qué detalle conviene ajustar la próxima vez."
    ],
    [
        "Ahorro",
        "Ajusta tu presupuesto al cerrar el mes",
        "Ajusta tu presupuesto al cerrar el mes. Define qué necesitas y anota una acción concreta que puedas hacer hoy."
    ]
];

function adaptarPublicacion(post) {
    const ejemplo = publicacionesEnEspanol[post.id - 1];
    if (!ejemplo) return post;

    const [categoria, titulo, contenido] = ejemplo;
    return { ...post, title: `${categoria}: ${titulo}`, body: contenido };
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
