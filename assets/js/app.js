"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const locationButton = document.querySelector('#getLocationButton');
    const weatherButton = document.querySelector('#getWeatherInfoButton');

    locationButton.addEventListener('click', locationInfoUpdate);
    weatherButton.addEventListener('click', weatherInfoUpdate);
}

async function getIp() {
    const url = 'https://api.ipify.org/?format=json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        return await data.ip;
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function getIpInfo() {
    const ip = await getIp()

    const url = `https://ipinfo.io/${ip}/geo`;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function getCordinats() {
    const city = (await getIpInfo()).city;
    const region = (await getIpInfo()).region;

    const url = `https://nominatim.openstreetmap.org/search?q=${city},${region}&format=json`
    try {
        const response = await fetch(url);
        const data = await response.json();

        let lat = await data[0].lat;
        let lon = await data[0].lon;

        return {lat: lat, lon: lon};
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function weatherInformation() {
    const lat = (await getCordinats()).lat
    const lon = (await getCordinats()).lon

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,rain&forecast_days=1`
    try {
        const response = await fetch(url);
        return await response.json();

    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

async function locationInfoUpdate(){
    const ip = await getIp()
    const data = await getIpInfo()

    const infoIp = document.querySelector('#infoIp');
    const infoStad = document.querySelector('#infoStad');
    const infoRegio = document.querySelector('#infoRegio');
    const infoLand = document.querySelector('#infoLand');

    infoIp.innerHTML = `Ip: ${ip}`;
    infoStad.innerHTML = `Stad ${data.city}`;
    infoRegio.innerHTML = `Regio: ${data.region}`;
    infoLand.innerHTML = `Land: ${data.country}`;
}

async function weatherInfoUpdate() {
    const data = await weatherInformation()
    const infoRegen = document.querySelector('#regen');
    const infoTemperatuur = document.querySelector('#temperatuur');
    const infoWindSnelheid = document.querySelector('#windSnelheid');

    infoRegen.innerHTML = `Rain: ${data.current.rain}${data.current_units.rain}`
    infoTemperatuur.innerHTML = `Temperature: ${data.current.temperature_2m}${data.current_units.temperature_2m}`
    infoWindSnelheid.innerHTML = `Wind speed: ${data.current.wind_speed_10m}${data.current_units.wind_speed_10m}`
}