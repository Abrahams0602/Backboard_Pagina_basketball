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

/*Buscar Manualmente los jugadores */

const inputBusqueda = document.getElementById('jugadores');
const botonBuscar = document.getElementById('btn-buscar');
const contenedorResultados = document.getElementById('contenedor-jugadores');

botonBuscar.addEventListener('click', async (e)=> {
    e.preventDefault();
    const query = inputBusqueda.value.trim(); /**/

    if (query.length > 0){
        buscarJugadores(query);
    }else{
        alert("Por favor, escribe el nombre de un jugador");
    }
});
    


async function buscarJugadores(nombre){
    if(!contenedorResultados)return;

    contenedorResultados.innerHTML = '<div class="loader"></div>';

    const url = `https://api.balldontlie.io/v1/players?search=${nombre}&per_page=50`;

    try {
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }
        });

        if (!respuesta.ok){
            throw new Error('Error: ${respuesta.status}' );
        }

        const datos = await respuesta.json();
        renderizar(datos.data);

    }catch (error){
        console.error('Fallo en la petición:', error);
        contenedorResultados.innerHTML = "Error al buscar. Revisa tu API Key.";
    }
}

function renderizar(jugadores){
    contenedorResultados.innerHTML = '';

    jugadores.forEach(j =>{
        const div = document.createElement('div');
        div.className = 'carta-Jugadores1 animar-oculto';

        const colorEquipo = coloresEquipos[j.team.full_name] || '#333';
        const rutaEscudo = escudosEquipos[j.team.full_name] || "../assets/img/NBA-logo.png";

        div.style.background = colorEquipo;
        div.innerHTML = `
            <article>
                <div class="contenedor-foto">
                    <img src="${rutaEscudo}" alt="Escudo de ${j.team.full_name}" class="escudo-equipo">
                </div>
                <h3>${j.first_name} ${j.last_name}</h3>
                <ul>
                    <li>Equipo: ${j.team.full_name}</li>
                    <li>Posición: ${j.position || 'N/A'}</li>
                    <li>Conferencia: ${j.team.conference}</li>
                    <li>País: ${j.country}</li>
                    <li>Numero: ${j.jersey_number}</li>
                    <li>Estatura: ${j.height}</li>
                </ul>
            </article>
        `
        contenedorResultados.appendChild(div)
    });

    if (typeof activarAnimaciones === 'function'){
        activarAnimaciones()
    }
        
} 

/*Buscar los jugadores de cada equipo*/

const selectorEquipo = document.getElementById('jugadorPorEquipo');

selectorEquipo.addEventListener('change', (e)=>{
    const equipoId = e.target.value;
    if (equipoId){
        buscarPorEquipo(equipoId);
    }
});

async function buscarPorEquipo(id) {
    contenedorResultados.innerHTML = '<div class="loader">Cargando jugadores...</div>';

    const url = `https://api.balldontlie.io/v1/players?team_ids[]=${id}&per_page=50`;

    try{
        const respuesta = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': apiKey,
            }

        });

        const datos = await respuesta.json();

        renderizar(datos.data);
    }catch (error) {
        console.error('Error al filtrar por equipo:', error);
        contenedorResultados.innerHTML = "<p style='color: white;'>Error al cargar el equipo.</p>";
    
    }
}

/*Jugador Por posicion*/

const selectorPosicion = document.getElementById('jugadorPorPosicion');

selectorPosicion.addEventListener('change', ()=>{
    const posicionSeleccionada = selectorPosicion.value;
    const nombreBusqueda = document.getElementById('input-busqueda').value;

    if (nombreBusqueda){
        ejecutarFiltroCombinado(nombreBusqueda, posicionSeleccionada); /*En caso de que haya un nombre escrito, busca y luego filtra*/
    }
});

async function ejecutarFiltroCombinado(nombre, posicion){
    const url = `https://api.balldontlie.io/v1/players?search=${nombre}&per_page=100`;

    try{
        const respuesta = await(url,{
            headers: {'Authorization': apiKey}
        });

        const datos = await respuesta.json();

        let jugadoresFiltrados = datos.data;

        if (posicion){
            jugadoresFiltrados = datos.data.filter(j=> j.position && j.position.includes(posicion));
        }

        renderizar(jugadoresFiltrados);
    }catch (error) {
        console.error("Error filtrando:", error);
    }
}



