apiKey = "d39bbc5b-2366-463f-8d68-7e7ffc73c1a3";
/*Colores segun los equipos*/
const coloresEquipos = {
    "Atlanta Hawks": "#E03A3E",
    "Boston Celtics": "#007A33",
    "Brooklyn Nets": "#000000",
    "Charlotte Hornets": "#1D1160",
    "Chicago Bulls": "#CE1141",
    "Cleveland Cavaliers": "#860038",
    "Dallas Mavericks": "#00538C",
    "Denver Nuggets": "#0E2240",
    "Detroit Pistons": "#C8102E",
    "Golden State Warriors": "#1D428A",
    "Houston Rockets": "#CE1141",
    "Indiana Pacers": "#002D62",
    "LA Clippers": "#C8102E",
    "Los Angeles Lakers": "#552583", 
    "Memphis Grizzlies": "#5D76A9",
    "Miami Heat": "#98002E",
    "Milwaukee Bucks": "#00471B",
    "Minnesota Timberwolves": "#0C2340",
    "New Orleans Pelicans": "#0C2340",
    "New York Knicks": "#006BB6",
    "Oklahoma City Thunder": "#007AC1",
    "Orlando Magic": "#0077C0",
    "Philadelphia 76ers": "#006BB6",
    "Phoenix Suns": "#1D1160",
    "Portland Trail Blazers": "#E03A3E",
    "Sacramento Kings": "#5A2D81",
    "San Antonio Spurs": "#C4CED4",
    "Toronto Raptors": "#CE1141",
    "Utah Jazz": "#002B5C",
    "Washington Wizards": "#002B5C"
};

const escudosEquipos = {
    // CONFERENCIA ESTE
    "Atlanta Hawks": "../assets/img/escudos/atlanta.png",
    "Boston Celtics": "../assets/img/escudos/boston.png",
    "Brooklyn Nets": "../assets/img/escudos/brooklyn.png",
    "Charlotte Hornets": "../assets/img/escudos/charlotte.png",
    "Chicago Bulls": "../assets/img/escudos/chicago.png",
    "Cleveland Cavaliers": "../assets/img/escudos/cleveland.png",
    "Detroit Pistons": "../assets/img/escudos/detroit.png",
    "Indiana Pacers": "../assets/img/escudos/indiana.png",
    "Miami Heat": "../assets/img/escudos/miami.png",
    "Milwaukee Bucks": "../assets/img/escudos/milwaukee.png",
    "New York Knicks": "../assets/img/escudos/knicks.png",
    "Orlando Magic": "../assets/img/escudos/orlando.png",
    "Philadelphia 76ers": "../assets/img/escudos/philadelphia.png",
    "Toronto Raptors": "../assets/img/escudos/toronto.png",
    "Washington Wizards": "../assets/img/escudos/washington.png",

    // CONFERENCIA OESTE
    "Dallas Mavericks": "../assets/img/escudos/dallas.png",
    "Denver Nuggets": "../assets/img/escudos/denver.png",
    "Golden State Warriors": "../assets/img/escudos/golden-state.png",
    "Houston Rockets": "../assets/img/escudos/houston.png",
    "LA Clippers": "../assets/img/escudos/clippers.png",
    "Los Angeles Lakers": "../assets/img/escudos/lakers.png",
    "Memphis Grizzlies": "../assets/img/escudos/memphis.png",
    "Minnesota Timberwolves": "../assets/img/escudos/minnesota.png",
    "New Orleans Pelicans": "../assets/img/escudos/new-orleans.png",
    "Oklahoma City Thunder": "../assets/img/escudos/okc.png",
    "Phoenix Suns": "../assets/img/escudos/phoenix.png",
    "Portland Trail Blazers": "../assets/img/escudos/portland.png",
    "Sacramento Kings": "../assets/img/escudos/sacramento.png",
    "San Antonio Spurs": "../assets/img/escudos/san-antonio.png",
    "Utah Jazz": "../assets/img/escudos/utah.png"
};

let todosLosEquipos = [];
const inputEquipos = document.getElementById('equipos');
const botonbuscarEquipos = document.getElementById('btn-buscar-equipos');
const contenedorEquipos = document.getElementById('contenedor-equipos');
const selectorConferencia = document.getElementById('equiposConferencia')

function obtenerColorTexto(colorHex) {
    const r = parseInt(colorHex.slice(1, 3), 16);
    const g = parseInt(colorHex.slice(3, 5), 16);
    const b = parseInt(colorHex.slice(5, 7), 16);
    const luminosidad = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminosidad > 0.5 ? '#000000' : '#ffffff';
}
function filtrarEquipos(){
    const busqueda = inputEquipos.value.toLowerCase();
    const Conferencia = selectorConferencia.value;

    const filtrados = todosLosEquipos.filter(eq =>{
        const coincideNombre = eq.full_name.toLowerCase().includes(busqueda);
        const coincideConferencia = Conferencia === "" || eq.conference ===Conferencia;

        return coincideNombre && coincideConferencia;
    });
    renderizarEquipos(filtrados);

}
selectorConferencia.addEventListener('change', filtrarEquipos);

botonbuscarEquipos.addEventListener('click', (e)=>{
    e.preventDefault();
    filtrarEquipos();
});

async function cargarEquiposIniciales() {
    if (!contenedorEquipos) return;
    contenedorEquipos.innerHTML = '<div class="loader">Cargando equipos...</div>';
    
    const url = `https://api.balldontlie.io/v1/teams`;    
    try{
        const respuesta = await fetch(url, {
            headers: { 'Authorization': apiKey }
        });

        const datos = await respuesta.json();
        todosLosEquipos = datos.data;
        renderizarEquipos(todosLosEquipos);
    }catch (error) {
        console.error("Error al cargar equipos:", error);
    }
}


function renderizarEquipos(ListaEquipos){
    contenedorEquipos.innerHTML = '';

    if (ListaEquipos.length === 0){
        contenedorEquipos.innerHTML = "<p style='color:white;'>No se encontró el equipo.</p>";
        return;
    }

    ListaEquipos.forEach(eq=>{
        const div = document.createElement('div');
        div.className = 'carta-Jugadores1 animar-oculto';

        const color = coloresEquipos[eq.full_name] || '#333';
        const colorTexto = obtenerColorTexto(color);

        const rutaEscudo = escudosEquipos[eq.full_name] || "../assets/img/NBA-logo.png";

        div.style.background = color;
        div.style.color = colorTexto;
        div.innerHTML = `
            <article>
                <div class="contenedor-foto">
                    <img src="${rutaEscudo}" alt="Escudo de ${eq.full_name}" class="escudo-equipo">
                </div>
                <div style="padding: 15px;">
                    <h3>${eq.full_name}</h3>
                    <ul style="list-style: none; padding: 0;">
                        <li>Ciudad: ${eq.city}</li>
                        <li>Division: ${eq.division}</li>
                        <li>Conferencia: ${eq.conference}</li>
                    </ul>
                </div>
            </article>
        `;
        contenedorEquipos.appendChild(div)
    });
    if (typeof activarAnimaciones === 'function'){
        activarAnimaciones()
    }
        
}

cargarEquiposIniciales();