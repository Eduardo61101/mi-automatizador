# 🌦️ Clima

Una página web de clima que utiliza la ubicación del dispositivo para mostrar automáticamente las condiciones meteorológicas del lugar donde se encuentra el usuario.

## ✨ Características

- 📍 Detección automática de ubicación
- 🌡️ Temperatura actual
- 🌡️ Sensación térmica
- 💧 Humedad
- 💨 Velocidad del viento
- 🌧️ Probabilidad de precipitación
- ☀️ Condición meteorológica actual
- 📅 Pronóstico de 5 días
- 🔄 Actualización automática
- 📱 Diseño adaptable para celulares y computadoras

## 🛠️ Tecnologías

- HTML
- CSS
- JavaScript
- Open-Meteo API
- Geolocation API del navegador
- GitHub Pages

## 🌐 API

Los datos meteorológicos se obtienen mediante Open-Meteo.

https://open-meteo.com/

La ubicación del usuario se obtiene mediante la API de geolocalización del navegador.

El usuario debe conceder permiso al navegador para utilizar su ubicación.

## 📍 Ubicación automática

La página utiliza las coordenadas obtenidas del dispositivo para consultar el clima correspondiente.

Por ejemplo:

```text
📱 Nuevo Laredo
      ↓
📍 Coordenadas
      ↓
🌦️ Open-Meteo
      ↓
🌡️ Clima de Nuevo Laredo
