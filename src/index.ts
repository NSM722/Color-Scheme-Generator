import { Color } from './interface'

const colorPicker = document.getElementById('color');
const colorMode = document.getElementById('color-mode');
const colorForm = document.getElementById('color-form');
const colorWrapper = document.getElementById('wrapper');
const baseURL: string = "https://www.thecolorapi.com";
let colors: Color[] = [];


/**
 * Renders the HTML of the 5 colors
 */
function renderColorHTML():void {
  let colorHTML: string = ``
  for (let color of colors) {
    colorHTML += `
            <div class="color-item">
                <img src="${color.image.bare}" alt="${color.name.value}">
                <p class="hex-value">${color.name.closest_named_hex}</p> 
            </div>
        `
  }
  if(colorWrapper) {
    colorWrapper.innerHTML = colorHTML
  }

  /**
   * Copying color hex value to clipboard and alerting the user
   */
  const hexValueElements = document.querySelectorAll(".hex-value");
  hexValueElements.forEach(element => {
    element.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText((element as HTMLElement).innerText);
        alert("Text copied to clipboard: " + (element as HTMLElement).innerText);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    });
  })
}

/**
 * Fetches the API data
 */
async function getColors(urlString: string):Promise<void> {
  let colorValue = (colorPicker as HTMLInputElement).value.replace('#', '').trim()
  let colorModeValue = (colorMode as HTMLSelectElement).value;
  try {
    const response = await fetch(`${urlString}/scheme?hex=${colorValue}&mode=${colorModeValue}`)
    if (!response.ok) {
      throw new Error('😖, something went wrong with your request - Please try again!')
    } else {
      const data = await response.json()
      data.colors.forEach((item: Color) => {
        colors.push(item)
        renderColorHTML()
      })
    }
  } catch (err) {
    alert(err)
  }
  colors.length = 0
}

/**
 * Listens for the submit event on the form
 */
if(colorForm) {
  colorForm.addEventListener('submit', function (event) {
    event.preventDefault()
    getColors(baseURL)
  })
}