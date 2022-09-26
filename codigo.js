let tiempoProcesos = [];
const fragmento = document.createDocumentFragment();
const table = document.querySelector(".table");
const sectionTable = document.querySelector(".section-table");
const sectionAnimacion = document.querySelector(".section-animacion");
const divAnimacion = document.querySelector(".animacion");
const divReset2 = document.createElement("div");

const Mostrar = ()=>{
    const tituloTabla = document.createElement("h1");
    const cantidadProcesos = parseInt(document.getElementById(`Procesos`).value);
    sectionTable.classList.add("section-table-style")
    

    // ciclo para ingresar los tiempos de ejecucion de los procesos
    for (let i = 0; i < cantidadProcesos; i++) {
        let cantidadProcesos = prompt("ingrese el tiempo de ejecucion del proceso " + (i + 1));
        tiempoProcesos[i] = cantidadProcesos;
    }
    
    // ordenar los elementos del array de menor a mayor
    tiempoProcesos.sort(function(a, b){return a - b});

    // Se crea el encabezado de la tabla
    console.log(tiempoProcesos);
    const trPrincipal = document.createElement("tr");
    const thProceso = document.createElement("th");
    thProceso.innerHTML = "Proceso"
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

    trPrincipal.appendChild(thProceso);
    trPrincipal.appendChild(thTiempoLlegada);
    trPrincipal.appendChild(thPTiempoEjecucion);
    trPrincipal.appendChild(thTiempoSalida);
    trPrincipal.appendChild(thServicio);
    trPrincipal.appendChild(thEspera);
    trPrincipal.appendChild(thIndice);
    fragmento.appendChild(trPrincipal);

    let tiempoSalida = 0;
    let mediaServicio = 0;
    let mediaEspera = 0;
    let mediaIndice = 0;

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
        tdTiempoSalida.setAttribute("id", "tiempoSalida" + (i+1))
        
        tr.appendChild(tdProceso);
        tr.appendChild(tdTiempoLlegada);
        tr.appendChild(tdTiempoEjecucion);
        
        tdTiempoSalida.innerHTML = parseInt(tdTiempoEjecucion.innerHTML) + parseInt(tiempoSalida);
        tr.appendChild(tdTiempoSalida);
        tiempoSalida = tdTiempoSalida.innerHTML;
        
        const tdServicio = document.createElement("td");
        tdServicio.innerHTML = parseInt(tdTiempoSalida.innerHTML) - parseInt(tdTiempoLlegada.innerHTML);
        tr.appendChild(tdServicio);
        
        const tdEspera = document.createElement("td");
        tdEspera.innerHTML = parseInt(tdServicio.innerHTML) - parseInt(tdTiempoEjecucion.innerHTML);
        tr.appendChild(tdEspera);   

        const tdIndice = document.createElement("td");
        tdIndice.innerHTML = (parseFloat(tdTiempoEjecucion.innerHTML) / parseFloat(tdServicio.innerHTML)).toFixed(2);
        console.log(tdServicio);
        tr.appendChild(tdIndice);
        fragmento.appendChild(tr);
        mediaServicio += parseInt(tdServicio.innerHTML);
        mediaEspera += parseInt(tdEspera.innerHTML);
        mediaIndice += parseInt(tdIndice.innerHTML);
    }

    console.log(mediaServicio);

    const trFinal = document.createElement("tr");
    for(let i = 0; i <3; i++){
        const tdEspacio = document.createElement("td");
        trFinal.appendChild(tdEspacio);
    }
    const tdMedias = document.createElement("td");
    tdMedias.innerHTML = "<b>Medias</b>";

    const tdMediaServicio = document.createElement("td");
    tdMediaServicio.innerHTML = `<b> ${(mediaServicio / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

    const tdMediaEspera = document.createElement("td");
    tdMediaEspera.innerHTML = `<b>${(mediaEspera / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

    const tdMediaIndice = document.createElement("td");
    tdMediaIndice.innerHTML = `<b>${(mediaIndice / parseInt(cantidadProcesos)).toFixed(2)}</b>`;

    trFinal.appendChild(tdMedias);
    trFinal.appendChild(tdMediaServicio);
    trFinal.appendChild(tdMediaEspera);
    trFinal.appendChild(tdMediaIndice);
    fragmento.appendChild(trFinal);

    table.appendChild(fragmento);
    
    const spanAnimacion = document.createElement("span");
    spanAnimacion.innerHTML = "VER ANIMACION";
    const crearAnimacion = document.createElement("a");
    crearAnimacion.setAttribute("id", "crearAnimacion");
    crearAnimacion.href = "#section-animacion";
    crearAnimacion.setAttribute("onclick", "Animar()");
    crearAnimacion.appendChild(spanAnimacion);

    const spanReset1 = document.createElement("span");
    spanReset1.innerHTML = "REGRESAR";
    const reset1 = document.createElement("a");
    reset1.setAttribute("id", "Reset1");
    reset1.href = "#section-principal";
    reset1.setAttribute("onclick", "resetTabla()");
    reset1.appendChild(spanReset1);

    fragmento.appendChild(crearAnimacion);
    fragmento.appendChild(reset1);
    sectionTable.appendChild(fragmento);

    document.getElementById("Mostrar").classList.add("disabled");
    // table.appendChild(fragmento);
}

const resetTabla = ()=> {
    const reset1 = document.getElementById("Reset1");
    table.innerHTML = "";
    const cantidadProcesos = document.getElementById(`Procesos`).value = "";
    document.getElementById("Mostrar").classList.remove("disabled");
    sectionTable.removeChild(crearAnimacion);
    sectionTable.removeChild(reset1);
    sectionTable.classList.remove("section-table-style")
}

const Animar = ()=>{
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
    
    let marginLeft = 0;
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
        
        document.getElementById("divBar" + (j+1)).style.marginLeft = marginLeft + "px";
        marginLeft = tiempoProcesos[j] * 30 + parseInt(document.getElementById("divBar" + (j+1)).style.marginLeft);
        console.log(marginLeft);
    }

    divAnimacion.appendChild(fragmento);

    const spanReset2 = document.createElement("span");
    spanReset2.innerHTML = "RESETEAR TODO"
    const reset2 = document.createElement("a");
    reset2.setAttribute("id", "Reset2");
    reset2.href = "#";
    reset2.setAttribute("onclick", "resetTodo()");
    reset2.appendChild(spanReset2);
    divReset2.appendChild(reset2);
    fragmento.appendChild(divReset2);
    sectionAnimacion.appendChild(fragmento);
}

const resetTodo = ()=> {
    const reset1 = document.getElementById("Reset1");
    const reset2 = document.getElementById("Reset2");
    const crearAnimacion = document.getElementById("crearAnimacion");
    sectionTable.removeChild(crearAnimacion);
    sectionTable.removeChild(reset1);
    divAnimacion.innerHTML = "";
    table.innerHTML = "";
    divReset2.innerHTML = "";
    const cantidadProcesos = document.getElementById(`Procesos`).value = "";
    document.getElementById("Mostrar").classList.remove("disabled");
    sectionAnimacion.classList.remove("section-animacion-style");
    sectionTable.classList.remove("section-table-style");
}