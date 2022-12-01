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
}

/**
 * Fetches the API data
 */
function getColors(urlString) {
  let colorValue = colorPicker.value.replace('#', '').trim()
  let colorModeValue = colorMode.value;
  try {
    fetch(`${urlString}/scheme?hex=${colorValue}&mode=${colorModeValue}`)
      .then(response => response.json())
      .then(data => data.colors.forEach(item => {
        colors.push(item)
        renderColorHTML()
      }))
  } catch (error) {
    console.log(error)
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




