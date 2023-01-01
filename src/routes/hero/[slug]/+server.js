import { error } from '@sveltejs/kit';
import { createCanvas } from "canvas";

export function GET({ params }) {
    return new Promise((resolve, reject) => {
        const canvas = createCanvas(900, 400);
        const ctx = canvas.getContext('2d');

        let seed = parseInt(params.slug.split('').map((e) => {
            return e.charCodeAt();
        }).join(''));
        let rng = random(seed);

        let min = 54;
        let max = 177;

        ctx.fillStyle = color(min, max, rng);
        ctx.fillRect(0, 0, 300, 400);
        ctx.fillStyle = color(min, max, rng);
        ctx.fillRect(300, 0, 300, 400);
        ctx.fillStyle = color(min, max, rng);
        ctx.fillRect(600, 0, 300, 400);

        resolve(new Response(canvas.toBuffer("image/jpeg")));
    }).catch(() => {
        throw error(404, 'Not found');
    })
}

function random(seed) {
    // https://stackoverflow.com/questions/521295/seeding-the-random-number-generator-in-javascript
    var m = 2 ** 35 - 31
    var a = 185852
    var s = seed % m
    return function () {
        return (s = s * a % m) / m
    }
}

function color(min, max, rng) {
    let head = Math.floor(rng() * 10);
    for (let i = 0; i < head; i++) {
        rng()
    }
    let c = [min, max, Math.floor(rng() * (max - min)) + min].sort(() =>
        rng() > 0.5 ? 1 : -1
    );
    return `rgb(${c[0]},${c[1]},${c[2]})`;
}