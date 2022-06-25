let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

class RandomParticle {
    constructor(x, y, radius = 1) {
        this.x = x;
        this.y = y;
        // this.r = Math.floor(Math.random() * radius);
        this.r = radius;
        this.color = this.generateRandomRGBAColor();
    }

    generateRandomRGBAColor() {
        let red = Math.floor(Math.random() * 255);
        let green = Math.floor(Math.random() * 255);
        let blue = Math.floor(Math.random() * 255);
        let alpha = Math.floor(Math.max(Math.random() * 10, 2)) / 10;

        return `rgba(${red}, ${green}, ${blue}, ${alpha}`;
    }

    draw(context) {
        this.context = context;

        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
        context.closePath();

        context.fillStyle = this.color;
        context.fill();
    }
}

let circles = [];
let points = [];
for (let i = 0; i < 100; i++) {
    let c = new RandomParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        5
    );
    // update arrays
    circles.push(c);
    points.push([c.x, c.y]);
    // render
    c.draw(context);
}

// Delaunay Stuff
const delaunay = d3.Delaunay.from(points);
const voronoi = delaunay.voronoi([0, 0, window.innerWidth, window.innerHeight]);
// delaunay.render(context);

console.log(points);
console.log(delaunay);

context.lineWidth = 1;
// // Voronoi cells
// const voronoiSegments = voronoi.render().split(/M/).slice(1);
// // let i = 0;
// for (const e of voronoiSegments) {
//     context.beginPath();
//     context.strokeStyle = "#999999";
//     context.stroke(new Path2D("M" + e));
// }

// Triangle mesh
const meshSegments = delaunay.render().split(/M/).slice(1);
// let j = 0;
for (const e of meshSegments) {
    context.beginPath();
    context.strokeStyle = "#000000";
    context.stroke(new Path2D("M" + e));
}
