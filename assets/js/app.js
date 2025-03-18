"use strict";

document.addEventListener("DOMContentLoaded", init);

function init() {
    const button = document.querySelector('#submitButton');
    button.addEventListener('click', getIp);
}

async function getIp() {
    const url = 'https://api.ipify.org/?format=json';
    try {
        const response = await fetch(url);
        const data = await response.json();
        getIpInfo(data.ip);
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}


async function getIpInfo(ip) {
    const infoIp = document.querySelector('#infoIp');
    const infoStad = document.querySelector('#infoStad');
    const infoRegio = document.querySelector('#infoRegio');
    const infoLand = document.querySelector('#infoLand');

    const url = `https://ipinfo.io/${ip}/geo`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        infoIp.innerHTML = `Ip: ${ip}`;
        infoStad.innerHTML = `Stad ${data.city}`;
        infoRegio.innerHTML = `Regio: ${data.region}`;
        infoLand.innerHTML = `Land: ${data.country}`;
    } catch (error) {
        console.error('Error fetching IP:', error);
    }
}

