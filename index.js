const colorPicker = document.getElementById('color');
const colorMode = document.getElementById('color-mode');
const colorForm = document.getElementById('color-form')
const baseURL = "https://www.thecolorapi.com"
let colors = []


/**
 * Renders the HTML of the 5 colors
 */
function renderColorHTML() {
  let colorHTML = ``
  for (let color of colors) {
    colorHTML += `
            <div class="color-item">
                <img src="${color.image.bare}" alt="${color.name.value}">
                <p class="hex-value">${color.name.closest_named_hex}</p> 
            </div>
        `
  }
  document.getElementById('wrapper').innerHTML = colorHTML

  /**
   * Copying color hex value to clipboard and alerting the user
   */
  const hexValueElements = document.querySelectorAll(".hex-value");
  hexValueElements.forEach(element => {
    element.addEventListener("click", async function () {
      try {
        await navigator.clipboard.writeText(element.innerText);
        alert("Text copied to clipboard: " + element.innerText);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    });
  })
}

/**
 * Fetches the API data
 */
async function getColors(urlString) {
  let colorValue = colorPicker.value.replace('#', '').trim()
  let colorModeValue = colorMode.value;
  try {
    const response = await fetch(`${urlString}/scheme?hex=${colorValue}&mode=${colorModeValue}`)
    if (!response.ok) {
      throw new Error('😖, something went wrong with your request - Please try again!')
    } else {
      const data = await response.json()
      data.colors.forEach(item => {
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
colorForm.addEventListener('submit', function (event) {
  event.preventDefault()
  getColors(baseURL)
})

