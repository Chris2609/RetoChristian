async function datosEuskalmet(){

    tokenEuskalmet = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtiZGJAcGxhaWF1bmRpLm5ldCJ9.Lf9-2osDOWeJhSyguL5nUx94KYVKM1fZOcU9PGsJPG4iyTMq_gTELdGqxssd8UhhgcQ-hsTXxaWUc8FK2cn4_TuvA_I6FXu6VH5utjMmdhQDgOCPCud-uMWYs-6EGCM97zwZJwlqXu-HNilTNUvOUGWuXoL2R3eOIfOI4g5V2n5Wkk1EfXbUunvBaiqIhJPKTC6IK5XiUEO6TKTtPsEgx3V1BX84JGAEa98qTfgUWDWzrnSMd7l-VCcLTScaJqmZI4RtiwHn2D5Og8gnaztpoRHFFLVFuFDwPdz1K9n8FdsdSQoxBugW6NeP-wjgev7PjLYM18Enq6JegRdw6MYjhA";

    let fechaHoy = new Date();
    let hoyFormateado = fechaHoy.toISOString().split('T')[0].replace(/-/g, '/');

    let manana = new Date();
    manana.setDate(fechaHoy.getDate() + 1);
    let mananaFormateado = manana.toISOString().split('T')[0].replace(/-/g, '');

    try {
        let respuesta = await $.ajax({
            url: `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/irun/forecast/at/${hoyFormateado}/for/${mananaFormateado}`,
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + tokenEuskalmet
            },
            dataType: "json"
        });
        
        if(respuesta["forecastText"]["SPANISH"] != undefined){
            previsionIrun = respuesta["forecastText"]["SPANISH"];
        } else{
            previsionIrun = "No hay datos disponibles"
        }

    } catch (error) {
        console.log(error);
    }
    
    try {
        let respuesta = await $.ajax({
            url: `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/hondarribia/forecast/at/${hoyFormateado}/for/${mananaFormateado}`,
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + tokenEuskalmet
            },
            dataType: "json"
        });
        
        if(respuesta["forecastText"]["SPANISH"] != undefined){
            previsionHondarribia = respuesta["forecastText"]["SPANISH"];
        } else{
            previsionHondarribia = "No hay datos disponibles"
        }
    } catch (error) {
        console.log(error);
    }

    try {
        let respuesta = await $.ajax({
            url: `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/coast_zone/locations/usurbil/forecast/at/${hoyFormateado}/for/${mananaFormateado}`,
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + tokenEuskalmet
            },
            dataType: "json"
        });
        
        if(respuesta["forecastText"]["SPANISH"] != undefined){
            previsionUsurbil = respuesta["forecastText"]["SPANISH"];
        } else{
            previsionUsurbil = "No hay datos disponibles"
        }

    } catch (error) {
        console.log(error);
    }

    try {
        let respuesta = await $.ajax({
            url: `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/donostia/forecast/at/${hoyFormateado}/for/${mananaFormateado}`,
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + tokenEuskalmet
            },
            dataType: "json"
        });
        
        if(respuesta["forecastText"]["SPANISH"] != undefined){
            previsionDonostia = respuesta["forecastText"]["SPANISH"];
        } else{
            previsionDonostia = "No hay datos disponibles"
        }
    } catch (error) {
        console.log(error);
    }

    try {
        let respuesta = await $.ajax({
            url: `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/donostialdea/locations/errenteria/forecast/at/${hoyFormateado}/for/${mananaFormateado}`,
            method: "GET",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": 'Bearer ' + tokenEuskalmet
            },
            dataType: "json"
        });
        
        if(respuesta["forecastText"]["SPANISH"] != undefined){
            previsionErrenteria = respuesta["forecastText"]["SPANISH"];
        } else{
            previsionErrenteria = "No hay datos disponibles"
        }
    } catch (error) {
        console.log(error);
    }

    var previsiones = [previsionDonostia, previsionErrenteria, previsionHondarribia, previsionIrun, previsionUsurbil];

    return previsiones;
}
