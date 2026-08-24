let ultimaUbicacion = null;


function obtenerUbicacion() {

    if (!navigator.geolocation) {

        mostrarError(
            "Tu navegador no permite obtener la ubicación."
        );

        return;
    }


    document.getElementById("city").textContent =
        "Buscando ubicación...";


    navigator.geolocation.getCurrentPosition(

        posicion => {

            const lat =
                posicion.coords.latitude;

            const lon =
                posicion.coords.longitude;


            ultimaUbicacion = {
                lat,
                lon
            };


            obtenerClima(lat, lon);
        },


        error => {

            console.error(error);

            mostrarError(
                "No se pudo obtener tu ubicación."
            );
        },

        {
            enableHighAccuracy: true,

            timeout: 15000,

            maximumAge: 300000
        }
    );
}



async function obtenerClima(lat, lon) {

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +

            `?latitude=${lat}` +

            `&longitude=${lon}` +

            "&current=" +

            "temperature_2m," +

            "relative_humidity_2m," +

            "apparent_temperature," +

            "precipitation," +

            "weather_code," +

            "wind_speed_10m" +

            "&hourly=" +

            "precipitation_probability" +

            "&daily=" +

            "temperature_2m_max," +

            "temperature_2m_min," +

            "weather_code" +

            "&timezone=auto" +

            "&forecast_days=5";


        const respuesta =
            await fetch(url);


        if (!respuesta.ok) {

            throw new Error(
                "Error en la API"
            );
        }


        const datos =
            await respuesta.json();


        mostrarClima(datos);

        obtenerCiudad(lat, lon);

    }

    catch (error) {

        console.error(error);

        mostrarError(
            "No se pudo obtener el clima."
        );
    }
}


async function obtenerCiudad(lat, lon) {

    try {

        const url =
            `https://nominatim.openstreetmap.org/reverse` +
            `?lat=${lat}` +
            `&lon=${lon}` +
            `&format=json` +
            `&accept-language=es`;

        const respuesta = await fetch(url);

        if (!respuesta.ok) {
            throw new Error("No se pudo obtener la ubicación");
        }

        const datos = await respuesta.json();

        const direccion = datos.address || {};

        const ciudad =
            direccion.city ||
            direccion.town ||
            direccion.municipality ||
            direccion.village ||
            "Ubicación actual";

        const estado =
            direccion.state ||
            "";

        const pais =
            direccion.country ||
            "";

        document.getElementById("city").textContent =
            ciudad;

        document.getElementById("country").textContent =
            `${estado}, ${pais}`;

    }

    catch (error) {

        console.error(error);

        document.getElementById("city").textContent =
            "Ubicación actual";

        document.getElementById("country").textContent =
            "No se pudo determinar la ciudad";
    }
}




function mostrarClima(datos) {

    const actual =
        datos.current;


    const temperatura =
        Math.round(
            actual.temperature_2m
        );


    const sensacion =
        Math.round(
            actual.apparent_temperature
        );


    document.getElementById(
        "temperature"
    ).textContent = temperatura;


    document.getElementById(
        "feels"
    ).textContent =
        `${sensacion}°`;


    document.getElementById(
        "humidity"
    ).textContent =
        `${actual.relative_humidity_2m}%`;


    document.getElementById(
        "wind"
    ).textContent =
        `${Math.round(actual.wind_speed_10m)} km/h`;


    document.getElementById(
        "rain"
    ).textContent =
        obtenerProbabilidadLluvia(datos);


    const codigo =
        actual.weather_code;


    document.getElementById(
        "weatherIcon"
    ).textContent =
        obtenerIcono(codigo);


    document.getElementById(
        "description"
    ).textContent =
        obtenerDescripcion(codigo);


    mostrarPronostico(
        datos
    );


    document.getElementById(
        "updated"
    ).textContent =
        `Actualizado: ${new Date().toLocaleTimeString()}`;
}



function obtenerProbabilidadLluvia(datos) {

    if (
        !datos.hourly ||
        !datos.hourly.precipitation_probability
    ) {

        return "--%";
    }


    const probabilidad =
        datos.hourly
            .precipitation_probability[0];


    return `${probabilidad}%`;
}



function mostrarPronostico(datos) {

    const contenedor =
        document.getElementById(
            "forecastList"
        );


    contenedor.innerHTML = "";


    for (
        let i = 0;
        i < datos.daily.time.length;
        i++
    ) {

        const fecha =
            new Date(
                datos.daily.time[i] +
                "T12:00:00"
            );


        const dia =
            fecha.toLocaleDateString(
                "es-MX",
                {
                    weekday: "long"
                }
            );


        const codigo =
            datos.daily.weather_code[i];


        const max =
            Math.round(
                datos.daily.temperature_2m_max[i]
            );


        const min =
            Math.round(
                datos.daily.temperature_2m_min[i]
            );


        const elemento =
            document.createElement(
                "div"
            );


        elemento.className =
            "forecast-day";


        elemento.innerHTML = `

            <div class="day">
                ${capitalizar(dia)}
            </div>

            <div class="icon">
                ${obtenerIcono(codigo)}
            </div>

            <div class="temps">
                ${max}° / ${min}°
            </div>

        `;


        contenedor.appendChild(
            elemento
        );
    }
}



function obtenerIcono(codigo) {

    if (codigo === 0)
        return "☀️";

    if (codigo <= 3)
        return "🌤️";

    if (codigo <= 48)
        return "🌫️";

    if (codigo <= 57)
        return "🌧️";

    if (codigo <= 67)
        return "🌧️";

    if (codigo <= 77)
        return "❄️";

    if (codigo <= 82)
        return "🌦️";

    if (codigo <= 86)
        return "🌨️";

    if (codigo >= 95)
        return "⛈️";

    return "🌤️";
}



function obtenerDescripcion(codigo) {

    if (codigo === 0)
        return "Despejado";

    if (codigo <= 3)
        return "Parcialmente nublado";

    if (codigo <= 48)
        return "Niebla";

    if (codigo <= 67)
        return "Lluvia";

    if (codigo <= 77)
        return "Nieve";

    if (codigo <= 82)
        return "Lluvias";

    if (codigo <= 86)
        return "Nieve";

    if (codigo >= 95)
        return "Tormenta";

    return "Condición desconocida";
}



function capitalizar(texto) {

    return texto.charAt(0).toUpperCase()
        + texto.slice(1);
}



function mostrarError(mensaje) {

    document.getElementById(
        "city"
    ).textContent =
        "No disponible";


    document.getElementById(
        "country"
    ).textContent =
        mensaje;
}



// Iniciar automáticamente

obtenerUbicacion();


// Volver a comprobar la ubicación
// cada 5 minutos

setInterval(
    obtenerUbicacion,
    300000
);
