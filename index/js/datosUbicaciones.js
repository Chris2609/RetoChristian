var intervalActualizar;

async function datosUbicaciones() {
    
    try {
        let respuesta = await fetch(laravelApi + "/api/obtenerDatosActuales", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        
        let data = await respuesta.json();
        console.log(data);

        var contenedorEnlacesTabs = document.getElementById("enlacesTabs");
        var contenedorContenidoTabs = document.getElementById("contenidoTabs");
        numTab = 2;

        todasPrevisiones = datosEuskalmet();
        arrayPrevisiones = await todasPrevisiones;

        var estadosCielo = ["Clear", "Rain", "Clouds"];
        for(let i = 0; i < data.length; i++){
            contenedorEnlacesTabs.innerHTML += `<a id="tab${numTab}" data-tab="${numTab}" class="tab ${data[i]["nombre"]}" style="display: none;">${data[i]["nombre"]}</a>`;

            let imagenCielo;
            if (!estadosCielo.includes(data[i]["estadoCielo"])) {
                imagenCielo = "Rain.jpg";
            } else {
                imagenCielo = `${data[i]["estadoCielo"]}.jpg`;
            }
            contenedorContenidoTabs.innerHTML += `<div id="tabcontent${numTab}" data-tab="${numTab}" class="tabcontent">
            <div class="fondoTiempo" id="fondoTiempo${data[i]["nombre"]}" style="background-image: url(img/${imagenCielo});" title="Previsión para mañana: ${arrayPrevisiones[i]}">
            
                <h1 class="temperatura" id="temperatura${data[i]["nombre"]}">${data[i]["temperatura"]}º</h1>
                <h2 class="humedad" id="humedad${data[i]["nombre"]}">Humedad: ${data[i]["humedad"]}%</h2>
                <h2 class="fecha"></h2>
                
            </div>
            
            <div id="izquierda" style="position: relative;">
                <div class="contenedorDestino" style="width: 100%; height: 350px;">
                    <div class="destino" style="float: left; width: 49%; height: 49%;"></div>
                    <div class="destino" style="float: right; width: 49%; height: 49%"></div>
                    
                    <div class="destino" style="float: left; width: 49%; height: 49%; position: relative; bottom: -7px;"></div>
                    <div class="destino" style="float: right; width: 49%; height: 49%; position: relative; bottom: -7px;"></div>
                </div>
                <div class="origen" style="width: 100%; height: 100px; margin-top: 10px; display: flex; flex-wrap: wrap; min-height: 120px; height:auto; align-items: center; justify-content: center;">
                    <div draggable="true" id="sensacionTermica_${data[i]["nombre"]}" style="display: flex; flex-wrap:wrap; align-items: center; justify-content: center; width: 25%">
                        <img draggable="false" src="img/sensacionTermica.png" style="margin-right: 10px; display: block; max-width: 100%; height: auto;" alt="sensacionTermica">
                        <h1 style="display:none;">${data[i]["sensacionTermica"]}º C</h1>
                    </div>
                    <div draggable="true" id="presionAtmosferica_${data[i]["nombre"]}" style="display: flex; flex-wrap:wrap; align-items: center; justify-content: center; width: 25%">
                        <img draggable="false" src="img/presionAtmosferica.png" style="margin-right: 10px; display: block; max-width: 100%; height: auto;" alt="presionAtmosferica">
                        <h1 style="display:none;">${data[i]["presionAtmosferica(hPa)"]} hPA</h1>
                    </div>
                    <div draggable="true" id="velocidadViento_${data[i]["nombre"]}" style="display: flex; flex-wrap:wrap; align-items: center; justify-content: center; width: 25%">
                        <img draggable="false" src="img/velocidadViento.png" style="margin-right: 10px; display: block; max-width: 100%; height: auto;" alt="velocidadViento">
                        <h1 style="display:none;">${data[i]["velocidadViento(m/s)"]} m/s</h1>
                    </div>
                    <div draggable="true" id="estadoCielo_${data[i]["nombre"]}" style="display: flex; flex-wrap:wrap; align-items: center; justify-content: center; width: 25%">
                        <img draggable="false" src="img/estadoCielo.png" style="margin-right: 10px; display: block; max-width: 100%; height: auto;" alt="estadoCielo">
                        <h1 style="display:none;">${data[i]["estadoCielo"]}</h1>
                    </div>
                </div>
            </div>
            
            <div id="derecha" style="text-align: center;">
                <div>
                <label for="fechaInicio${data[i]["nombre"]}">ㅤ</label>
                <label for="fechaFin${data[i]["nombre"]}">ㅤ</label>
                <input class="inputFecha" id="fechaInicio${data[i]["nombre"]}" type="date" min="2023-01-01" max="${new Date().toISOString().split('T')[0]}">
                <input class="inputFecha" id="fechaFin${data[i]["nombre"]}" type="date" min="2023-01-01" max="${new Date().toISOString().split('T')[0]}">
                <button class="botonGrafico" onclick="validarFechas('${data[i]["nombre"]}', document.getElementById('fechaInicio${data[i]["nombre"]}').value, document.getElementById('fechaFin${data[i]["nombre"]}').value)">Enviar</button>
                </div>
                
                
                <div style="width: 100%; height: auto; max-height: 420px margin-top: 30px;">
                    <canvas class="grafico" id="grafico_${data[i]["nombre"]}" style="width:100%; min-height:400px; max-height: 420px"></canvas>
                </div>
            </div>
        </div>`;
        numTab++;

        }
        cargarTabs();
        cargarMapa();
        dragDrop();
        $(document).tooltip();  
    } catch (error) {
        console.log(error);
    }



    intervalActualizar = setInterval(() => {
        actualizarDatos();
        console.log("actualizado")
    }, 10000);
}

async function actualizarDatos(){
    try {
        let respuesta = await fetch(laravelApi + "/api/obtenerDatosActuales", {
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                Authorization: 'Bearer ' + sessionStorage.getItem("token")
            }
        });
        
        let data = await respuesta.json();

        var estadosCielo = ["Clear", "Rain", "Clouds"];

        for (let i = 0; i < data.length; i++) {
            if(localStorage.getItem("favoritos").split(",").includes(data[i]["nombre"])){

                let imagenCielo;
                if (!estadosCielo.includes(data[i]["estadoCielo"])) {
                    imagenCielo = "Rain.jpg";
                } else {
                    imagenCielo = `${data[i]["estadoCielo"]}.jpg`;
                }
                document.getElementById(`fondoTiempo` + `${data[i]["nombre"]}`).style.backgroundImage = `url(img/${imagenCielo})`;
                var contenedorTemp = document.getElementById(`temperatura${data[i]["nombre"]}`);
                contenedorTemp.textContent = data[i]["temperatura"] + "º";
                var contenedorHum = document.getElementById(`humedad${data[i]["nombre"]}`);
                contenedorHum.textContent = "Humedad: " + data[i]["humedad"] + "%";
                try {
                    var contenedorSensacionTermica = document.getElementById(`sensacionTermica_${data[i]["nombre"]}`).getElementsByTagName("h1")[0];
                    contenedorSensacionTermica.textContent = `${data[i]["sensacionTermica"]}º C`;
                } catch (error) {
                    
                }
                try {
                    var contenedorPresionAtmosferica = document.getElementById(`presionAtmosferica_${data[i]["nombre"]}`).getElementsByTagName("h1")[0];
                    contenedorPresionAtmosferica.textContent = `${data[i]["presionAtmosferica(hPa)"]} hPa`;
                } catch (error) {
                    
                }
                try {
                    var contenedorVelocidadViento = document.getElementById(`velocidadViento_${data[i]["nombre"]}`).getElementsByTagName("h1")[0];
                    contenedorVelocidadViento.textContent = `${data[i]["velocidadViento(m/s)"]} m/s`;
                }
                catch (error) {
                    
                }
                try {
                    var contenedorEstadoCielo = document.getElementById(`estadoCielo_${data[i]["nombre"]}`).getElementsByTagName("h1")[0];
                    contenedorEstadoCielo.textContent = data[i]["estadoCielo"];
                } catch (error) {
                
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}