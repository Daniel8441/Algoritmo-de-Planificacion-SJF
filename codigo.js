let tiempoProcesos = []; //Se crea un array vacio para ingresar los tiempos de cada proceso

const btnMostrar = document.querySelector(".btn-Mostrar");
btnMostrar.addEventListener("click", Iniciar); //Agregar evento al boton INICIAR

//Se llaman y declaran las etiquetas creadas en HTML
const inputCantidadProcesos = document.getElementById("Procesos");
const fragmento = document.createDocumentFragment();
const table = document.querySelector(".table");
const sectionTable = document.querySelector(".section-table");
const sectionAnimacion = document.querySelector(".section-animacion");
const divAnimacion = document.querySelector(".animacion");
const divReset2 = document.createElement("div");
const modal = document.querySelector(".section-principal__modal");
const modalContainer = document.querySelector(".section-principal__modal-Container");
const modalContent = document.querySelector(".section-principal__modal-Content");

//funcion para validar la cantidad de procesos y mostrar modal para ingresar el tiempo de ejecucion de cada proceso
function Iniciar(){
    const cantidadProcesos = parseInt(document.getElementById(`Procesos`).value);
    if (inputCantidadProcesos.value == "") {
        alert("Ingrese la cantidad de procesos");
    } else {  
        modal.classList.add("modal-capa");
        modalContainer.classList.add("modal-Container");
        for (let i = 0; i < cantidadProcesos; i++) {
            const divContent2 = document.createElement("div");
            divContent2.classList.add("div-content-style");
            const parrafoProceso = document.createElement("p");
            parrafoProceso.classList.add("parrafo-modal");
            parrafoProceso.innerHTML = "Ingrese el tiempo de ejecucion del proceso " + (i+1);
            const inputProceso = document.createElement("input");
            inputProceso.setAttribute("type", "number");
            inputProceso.classList.add("input-modal");
            inputProceso.setAttribute("id", "inputProceso" + i);
            divContent2.appendChild(parrafoProceso);
            divContent2.appendChild(inputProceso);
            fragmento.appendChild(divContent2);
        }
        const divButtonGuardar = document.createElement("div");
        divButtonGuardar.setAttribute("id", "divButtonSiguiente");
        const spanGuardar = document.createElement("span");
        spanGuardar.innerHTML = "Guardar";
        const buttonGuardar = document.createElement("a");
        buttonGuardar.addEventListener("click", Mostrar);
        buttonGuardar.setAttribute("id", "btn-Guardar");
        buttonGuardar.setAttribute("href", "#section-table");
        buttonGuardar.appendChild(spanGuardar);
        divButtonGuardar.appendChild(buttonGuardar);
        modalContent.appendChild(fragmento);
        fragmento.appendChild(divButtonGuardar);
        modalContainer.appendChild(fragmento);
    }
}

//funcion para validar cada input del tiempo de ejecucion
function validarInputs(){
    const cantidadProcesos = parseInt(document.getElementById(`Procesos`).value);
    for (let i = 0; i < cantidadProcesos; i++) {
        if (document.getElementById("inputProceso" + i).value == "") {
            return false;  
        }
    }
}

//funcion para ingresar la cantidad de procesos a ejecutar y mostrarlos en una tabla
function Mostrar(){
    const cantidadProcesos = parseInt(document.getElementById(`Procesos`).value);
    if (validarInputs() == false) { //se llama la funcion para ejecutarla y mientras que sea false mostrar alerta
        alert("Ingrese el tiempo de ejecucion del proceso faltante");
    } else { //si la funcion validar inputs ya no es false ya puede seguir ejecutando el codigo
        sectionTable.classList.add("section-table-style");
        modal.classList.remove("modal-capa");
        modalContainer.classList.remove("modal-Container");
        document.getElementById("divButtonSiguiente").innerHTML = "";
        modalContainer.removeChild(divButtonSiguiente);

        //obtener datos de los input de tiempo de ejcucion
        for (let i = 0; i < cantidadProcesos; i++) {
            tiempoProcesos[i] = document.getElementById("inputProceso" + i).value;
            console.log(tiempoProcesos[i]);
        }

        modalContent.innerHTML = "";

        // ordenar los elementos del array de menor a mayor
        tiempoProcesos.sort(function (a, b) { return a - b });

        // Se crea el encabezado de la tabla
        console.log(tiempoProcesos);
        const trPrincipal = document.createElement("tr");
        const thProceso = document.createElement("th");
        thProceso.innerHTML = "Proceso";
        const thTiempoLlegada = document.createElement("th");
        thTiempoLlegada.innerHTML = "Tiempo de Llegada";
        const thPTiempoEjecucion = document.createElement("th");
        thPTiempoEjecucion.innerHTML = "Tiempo de Ejecucion";
        const thTiempoSalida = document.createElement("th");
        thTiempoSalida.innerHTML = "Tiempo de Salida";
        const thServicio = document.createElement("th");
        thServicio.innerHTML = "Servicio";
        const thEspera = document.createElement("th");
        thEspera.innerHTML = "Espera";
        const thIndice = document.createElement("th");
        thIndice.innerHTML = "Indice";

        // se inserta el encabezado en la tabla
        trPrincipal.appendChild(thProceso);
        trPrincipal.appendChild(thTiempoLlegada);
        trPrincipal.appendChild(thPTiempoEjecucion);
        trPrincipal.appendChild(thTiempoSalida);
        trPrincipal.appendChild(thServicio);
        trPrincipal.appendChild(thEspera);
        trPrincipal.appendChild(thIndice);
        fragmento.appendChild(trPrincipal);

        // se crean variables para calcular los valores al final de la tabla
        let tiempoSalida = 0;
        let mediaServicio = 0;
        let mediaEspera = 0;
        let mediaIndice = 0;

        // Ciclo para llenar la tabla segun la cantidad y tiempo de ejecucion de los procesos
        for (let i = 0; i < cantidadProcesos; i++) {
            const tr = document.createElement("tr");
            const tdProceso = document.createElement("td");
            tdProceso.innerHTML = "Proceso " + (i + 1);
            const tdTiempoLlegada = document.createElement("td");
            tdTiempoLlegada.innerHTML = i;
            const tdTiempoEjecucion = document.createElement("td");
            tdTiempoEjecucion.innerHTML = tiempoProcesos[i];
            tdTiempoEjecucion.setAttribute("id", "TiempoEjecucion" + (i + 1));
            const tdTiempoSalida = document.createElement("td");
            tdTiempoSalida.setAttribute("id", "tiempoSalida" + (i + 1))

            tr.appendChild(tdProceso);
            tr.appendChild(tdTiempoLlegada);
            tr.appendChild(tdTiempoEjecucion);

            //insertar en tabla el tiempo de salida de cada proceso
            tdTiempoSalida.innerHTML = parseInt(tdTiempoEjecucion.innerHTML) + parseInt(tiempoSalida);
            tr.appendChild(tdTiempoSalida);
            tiempoSalida = tdTiempoSalida.innerHTML;

            //insertar en tabla el servicio de cada proceso
            const tdServicio = document.createElement("td");
            tdServicio.innerHTML = parseInt(tdTiempoSalida.innerHTML) - parseInt(tdTiempoLlegada.innerHTML);
            tr.appendChild(tdServicio);

            //insertar en tabla el tiempo de espera de cada proceso
            const tdEspera = document.createElement("td");
            tdEspera.innerHTML = parseInt(tdServicio.innerHTML) - parseInt(tdTiempoEjecucion.innerHTML);
            tr.appendChild(tdEspera);

            //insertar en tabla el indice de cada proceso
            const tdIndice = document.createElement("td");
            tdIndice.innerHTML = (parseFloat(tdTiempoEjecucion.innerHTML) / parseFloat(tdServicio.innerHTML)).toFixed(2);
            console.log(tdServicio);
            tr.appendChild(tdIndice);

            fragmento.appendChild(tr); //se inserta los datos ya creados en la tabla

            //se usa la Adicion Asignacion a las variables para despues sacar el promedio
            mediaServicio += parseInt(tdServicio.innerHTML);
            mediaEspera += parseInt(tdEspera.innerHTML);
            mediaIndice += parseInt(tdIndice.innerHTML);
        }

        // se crea la parte final de la tabla
        const trFinal = document.createElement("tr");
        for (let i = 0; i < 3; i++) {
            const tdEspacio = document.createElement("td");
            trFinal.appendChild(tdEspacio);
        }

        const tdMedias = document.createElement("td");
        tdMedias.innerHTML = "<b>Medias</b>";

        //con los datos de las variables anteriores de calcula el promedio segun la cantidad de procesos
        const tdMediaServicio = document.createElement("td");
        tdMediaServicio.innerHTML = `<b> ${(mediaServicio / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

        const tdMediaEspera = document.createElement("td");
        tdMediaEspera.innerHTML = `<b>${(mediaEspera / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

        const tdMediaIndice = document.createElement("td");
        tdMediaIndice.innerHTML = `<b>${(mediaIndice / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

        //Se agregan todos los elementos creados a la tabla
        trFinal.appendChild(tdMedias);
        trFinal.appendChild(tdMediaServicio);
        trFinal.appendChild(tdMediaEspera);
        trFinal.appendChild(tdMediaIndice);
        fragmento.appendChild(trFinal);
        table.appendChild(fragmento);

        //Crear un boton para ver la animacion de los procesos y se asigna evento
        const spanAnimacion = document.createElement("span");
        spanAnimacion.innerHTML = "VER ANIMACION";
        const crearAnimacion = document.createElement("a");
        crearAnimacion.setAttribute("id", "crearAnimacion");
        crearAnimacion.href = "#section-animacion";
        crearAnimacion.addEventListener("click", Animar);
        crearAnimacion.appendChild(spanAnimacion);

        //Crear un boton para resetear la parte de la tabla y se asigna evento
        const spanReset1 = document.createElement("span");
        spanReset1.innerHTML = "REGRESAR";
        const reset1 = document.createElement("a");
        reset1.setAttribute("id", "Reset1");
        reset1.href = "#section-principal";
        reset1.addEventListener("click", resetTabla);
        reset1.appendChild(spanReset1);

        //Agregar los botones a la seccion de la tabla
        fragmento.appendChild(crearAnimacion);
        fragmento.appendChild(reset1);
        sectionTable.appendChild(fragmento);

        //Asigna la clase disabled para desabilitar el boton iniciar
        document.getElementById("btn-Mostrar").classList.add("disabled");
    }
}

//Funcion para resetear la tabla
function resetTabla(){
    const reset1 = document.getElementById("Reset1");
    table.innerHTML = "";
    const cantidadProcesos = document.getElementById(`Procesos`).value = "";
    document.getElementById("btn-Mostrar").classList.remove("disabled");
    sectionTable.removeChild(crearAnimacion);
    sectionTable.removeChild(reset1);
    sectionTable.classList.remove("section-table-style")
}

//Funcion para crear la animacion de los procesos
function Animar(){
    const reset1 = document.getElementById("Reset1");
    sectionAnimacion.classList.add("section-animacion-style");
    divAnimacion.innerHTML = "";
    divReset2.innerHTML ="";
    reset1.classList.add("disabled");
    const cantidadProcesos = parseInt(document.getElementById(`Procesos`).value);
    for (let i = 0; i < cantidadProcesos; i++) {
        tiempoProcesos[i] = document.getElementById("TiempoEjecucion" + (i + 1)).innerHTML; 
    }
    console.log(tiempoProcesos);

    //ciclo para crear los elementos para animar
    for (let i = 0; i < cantidadProcesos; i++) {
        const divContenedor = document.createElement("div");
        divContenedor.classList.add("div-Contenedor");
        const Parrafo = document.createElement("h3");
        Parrafo.innerHTML = "Proceso" + (i + 1);
        const divBar = document.createElement("div");
        divBar.setAttribute("id", "divBar" + (i + 1));
        divBar.classList.add("animation-bar");
        divContenedor.appendChild(Parrafo);
        divContenedor.appendChild(divBar);
        fragmento.appendChild(divContenedor);
    }
    divAnimacion.appendChild(fragmento);
    
    let marginLeft = 0; //variable para asignar margin left a divbar
    //ciclo para crear animacion a cada divbar segun el tiempo de proceso de cada uno
    for (let j = 0; j < cantidadProcesos; j++) {
        document.getElementById("divBar" + (j + 1)).animate([
            { width: "0px" },
            { width: tiempoProcesos[j] * 30 + "px",},
        ], {
            duration: 500,
            iteration: 1,
            fill: `forwards`,
            delay: tiempoProcesos[j] * 400
        });
        
        //agregarle un margin left a cada divbar segun el tiempo de proceso que se le asigna
        document.getElementById("divBar" + (j+1)).style.marginLeft = marginLeft + "px";
        marginLeft = tiempoProcesos[j] * 30 + parseInt(document.getElementById("divBar" + (j+1)).style.marginLeft);
        console.log(marginLeft);
    }
    //Agregar los elementos creados de la animacion
    divAnimacion.appendChild(fragmento);

    //Crear un boton para resetar todo y se asigna evento
    const spanReset2 = document.createElement("span");
    spanReset2.innerHTML = "RESETEAR TODO"
    const reset2 = document.createElement("a");
    reset2.setAttribute("id", "Reset2");
    reset2.href = "#";
    reset2.addEventListener("click", resetTodo);
    reset2.appendChild(spanReset2);
    divReset2.appendChild(reset2);
    fragmento.appendChild(divReset2);
    sectionAnimacion.appendChild(fragmento);
}

//Funcion para resetear todo el programa y volver al principio
function resetTodo(){
    const reset1 = document.getElementById("Reset1");
    const reset2 = document.getElementById("Reset2");
    const crearAnimacion = document.getElementById("crearAnimacion");
    sectionTable.removeChild(crearAnimacion);
    sectionTable.removeChild(reset1);
    divAnimacion.innerHTML = "";
    table.innerHTML = "";
    divReset2.innerHTML = "";
    const cantidadProcesos = document.getElementById(`Procesos`).value = "";
    document.getElementById("btn-Mostrar").classList.remove("disabled");
    sectionAnimacion.classList.remove("section-animacion-style");
    sectionTable.classList.remove("section-table-style");
}