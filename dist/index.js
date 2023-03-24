"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        element.addEventListener("click", function () {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield navigator.clipboard.writeText(element.innerText);
                    alert("Text copied to clipboard: " + element.innerText);
                }
                catch (err) {
                    console.error("Failed to copy text: ", err);
                }
            });
        });
    });
}
function getColors(urlString) {
    return __awaiter(this, void 0, void 0, function* () {
        let colorValue = colorPicker.value.replace('#', '').trim();
        let colorModeValue = colorMode.value;
        try {
            const response = yield fetch(`${urlString}/scheme?hex=${colorValue}&mode=${colorModeValue}`);
            if (!response.ok) {
                throw new Error('😖, something went wrong with your request - Please try again!');
            }
            else {
                const data = yield response.json();
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
    });
}
if (colorForm) {
    colorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        getColors(baseURL);
    });
}
