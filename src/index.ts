const colorPicker = document.getElementById('color');
const colorMode = document.getElementById('color-mode');
const colorForm = document.getElementById('color-form');
const colorWrapper = document.getElementById('wrapper');
const baseURL: string = "https://www.thecolorapi.com";

/**
 * Interface
 */
interface Color {
  hex: {
    value:string;
    clean:string;
  };
  rgb: {
    fraction: {
      r: number;
      g: number;
      b: number;
    }, 
    r: number;
    g: number;
    b: number;
    value: string;
  };
  hsl: {
    fraction: {
      h: number;
      s: number;
      l: number;
    }, 
    h: number;
    s: number;
    l: number;
    value: string;
  };
  hsv: {
    fraction: {
      h:number;
      s:number;
      v:number;
    },
    value:string;
    h:number;
    s:number;
    v:number;
  };
  name: {
    value: string;
    closest_named_hex: string;
    exact_match_name: boolean;
    distance: number;
  };
  cmyk: {
    fraction: {
      c: number;
      y: number;
      m: number;
      k: number;
    },
    value: string;
    c: number;
    y: number;
    m: number;
    k: number;
    
  };
  XYZ: {
    fraction: {
      X: number;
      Y: number;
      Z: number;
    },
    value: string;
    X: number;
    Y: number;
    Z: number;
  };
  image: {
    bare: string;
    named: string;
  };
  contrast: {
    value: string;
  };
  _links: {
    self: {
      href: string
    };
  };
  _embedded: {};
}

/**
 * Initialize colors array
 */
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