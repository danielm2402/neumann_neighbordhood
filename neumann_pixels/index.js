let canvas = document.getElementById("maincanvas")
let fpsContainer = document.getElementById("fps")
let input = document.getElementById("input")
let ctx = canvas.getContext("2d")
var times = [];
var fps;


let CANVAS_WIDTH = 500
let NUMBER_OF_PIXELS = CANVAS_WIDTH * CANVAS_WIDTH * 4
let NUMBER_OF_PIXELS_PER_ROW = NUMBER_OF_PIXELS / CANVAS_WIDTH


function initializate() {
    animationLoop()
}

function animationLoop() {
    window.requestAnimationFrame(function () {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        draw()
        animationLoop();
        fpsContainer.innerHTML = fps + ' fps'
    }); 
}

function draw() {
    let imagedata = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let pixels = imagedata.data

    //ULTIMAS 3 FILAS DE MANERA RANDOM
    let init = NUMBER_OF_PIXELS - (NUMBER_OF_PIXELS_PER_ROW * 3)
    for (let i = init; i < pixels.length; i += 4) {
        const color = random_orange_tint()
        pixels[i] = color[0];
        pixels[i + 1] = color[1];
        pixels[i + 2] = color[2];
        pixels[i + 3] = 255;
    }

    for (let i = 2; i <= CANVAS_WIDTH; i++) {
        init = NUMBER_OF_PIXELS - (NUMBER_OF_PIXELS_PER_ROW * i)
        for (let index = init + 4; index < (init + NUMBER_OF_PIXELS_PER_ROW) - 4; index += 4) {
            const up = [pixels[index - NUMBER_OF_PIXELS_PER_ROW], pixels[(index - NUMBER_OF_PIXELS_PER_ROW) + 1], pixels[(index - NUMBER_OF_PIXELS_PER_ROW) + 2]]
            const down = [pixels[index + NUMBER_OF_PIXELS_PER_ROW], pixels[(index + NUMBER_OF_PIXELS_PER_ROW) + 1], pixels[(index + NUMBER_OF_PIXELS_PER_ROW) + 2]]
            const left = [pixels[index - 4], pixels[(index - 4) + 1], pixels[(index - 4) + 2]]
            const right = [pixels[index + 4], pixels[(index + 4) + 1], pixels[(index + 4) + 2]]
            const prom = [Math.trunc((up[0] + down[0] + left[0] + right[0]) / 4), Math.trunc((up[1] + down[1] + left[1] + right[1]) / 4), Math.trunc((up[2] + down[2] + left[2] + right[2]) / 4)]

            pixels[(index - NUMBER_OF_PIXELS_PER_ROW * 2)] = prom[0]
            pixels[(index - NUMBER_OF_PIXELS_PER_ROW * 2) + 1] = prom[1]
            pixels[(index - NUMBER_OF_PIXELS_PER_ROW * 2) + 2] = prom[2]
            pixels[(index - NUMBER_OF_PIXELS_PER_ROW * 2) + 3] = 255
        }
    }


    ctx.putImageData(imagedata, 0, 0)

}






input.addEventListener('keyup', handlerInput)




function handlerInput(e) {
    CANVAS_WIDTH = e.target.value
    NUMBER_OF_PIXELS = CANVAS_WIDTH * CANVAS_WIDTH * 4
    NUMBER_OF_PIXELS_PER_ROW = NUMBER_OF_PIXELS / CANVAS_WIDTH

    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_WIDTH
    initializate()
}




function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return [o(r() * s), o(r() * s), o(r() * s)]
}

function random_orange_tint() {
    var o = Math.round, r = Math.random, s = 255;
    var minRed = 200;  // Valor mínimo para el componente rojo
    var maxRed = 255;  // Valor máximo para el componente rojo
    var minGreen = 80;  // Valor mínimo para el componente verde
    var maxGreen = 150;  // Valor máximo para el componente verde
    var minBlue = 0;  // Valor mínimo para el componente azul
    var maxBlue = 50;  // Valor máximo para el componente azul
  
    var red = o(r() * (maxRed - minRed) + minRed);
    var green = o(r() * (maxGreen - minGreen) + minGreen);
    var blue = o(r() * (maxBlue - minBlue) + minBlue);
  
    return [red, green, blue];
  }