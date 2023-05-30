let canvas = document.getElementById("maincanvas")
let ctx = canvas.getContext("2d")

var times = [];
var fps;

function initializate() {
    gameLoop()
}


function gameLoop() {
    window.requestAnimationFrame(function () {
        const now = performance.now();
        while (times.length > 0 && times[0] <= now - 1000) {
            times.shift();
        }
        times.push(now);
        fps = times.length;
        draw()
        gameLoop();
        console.log(fps)
    });

}


function update() {
    draw()
}

function draw() {
    for (let x = 0; x < 500; x++) {
        for (let y = 499; y > 496; y--) {
            ctx.fillStyle = random_rgb()
            ctx.fillRect(x, y, 1, 1)
        }
    }

    for (let y = 498; y > 1; y--) {
        for (let x = 1; x < 499; x++) {
            const up = ctx.getImageData(x, y - 1, 1, 1).data;
            const down = ctx.getImageData(x, y + 1, 1, 1).data;
            const left = ctx.getImageData(x - 1, y, 1, 1).data;
            const right = ctx.getImageData(x + 1, y, 1, 1).data;
            const prom = [Math.trunc((up[0] + down[0] + left[0] + right[0]) / 4), Math.trunc((up[1] + down[1] + left[1] + right[1]) / 4), Math.trunc((up[2] + down[2] + left[2] + right[2]) / 4)]

            ctx.fillStyle = `rgb(${prom[0]}, ${prom[1]}, ${prom[2]})`
            ctx.fillRect(x, y - 2, 1, 1)
        }
    }

}

function random_rgb() {
    var o = Math.round, r = Math.random, s = 255;
    return `rgb(${o(r() * s)}, ${o(r() * s)}, ${o(r() * s)})`
    return [o(r() * s), o(r() * s), o(r() * s)]
}