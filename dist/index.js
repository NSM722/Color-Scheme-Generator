"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const colorPicker = document.getElementById('color');
const colorMode = document.getElementById('color-mode');
const colorForm = document.getElementById('color-form');
const colorWrapper = document.getElementById('wrapper');
const baseURL = "https://www.thecolorapi.com";
let colors = [];
function renderColorHTML() {
    let colorHTML = ``;
    for (let color of colors) {
        colorHTML += `
            <div class="color-item">
                <img src="${color.image.bare}" alt="${color.name.value}">
                <p class="hex-value">${color.name.closest_named_hex}</p> 
            </div>
        `;
    }
    if (colorWrapper) {
        colorWrapper.innerHTML = colorHTML;
    }
    const hexValueElements = document.querySelectorAll(".hex-value");
    hexValueElements.forEach(element => {
        element.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(element.innerText);
                alert("Text copied to clipboard: " + element.innerText);
            }
            catch (err) {
                console.error("Failed to copy text: ", err);
            }
        });
    });
}
async function getColors(urlString) {
    let colorValue = colorPicker.value.replace('#', '').trim();
    let colorModeValue = colorMode.value;
    try {
        const response = await fetch(`${urlString}/scheme?hex=${colorValue}&mode=${colorModeValue}`);
        if (!response.ok) {
            throw new Error('😖, something went wrong with your request - Please try again!');
        }
        else {
            const data = await response.json();
            data.colors.forEach((item) => {
                colors.push(item);
                renderColorHTML();
            });
        }
    }
    catch (err) {
        alert(err);
    }
    colors.length = 0;
}
if (colorForm) {
    colorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        getColors(baseURL);
    });
}
