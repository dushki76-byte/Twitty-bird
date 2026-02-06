const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 320;
canvas.height = 480;

let birdY = canvas.height / 2;
let birdVelocity = 0;
let birdFlapStrength = -6;
let gravity = 0.2;
let birdWidth = 20;
let birdHeight = 20;
let birdX = 50;
let isFlapping = false;
let obstacles = [];

// Event listener for clicks on the canvas to make the bird flap
canvas.addEventListener("click", () => {
    birdVelocity = birdFlapStrength; // When clicked, bird moves up
});

function createObstacle() {
    let height = Math.random() * (canvas.height / 2) + 50;
    obstacles.push({
        x: canvas.width,
        top: height,
        bottom: canvas.height - height - 100,
        width: 30
    });
}

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 2;
        // Remove obstacles that are off the screen
        if (obstacles[i].x + obstacles[i].width < 0) {
            obstacles.splice(i, 1);
            i--;
        }
    }
}

function checkCollisions() {
    // Check if the bird collides with any obstacles
    for (let obstacle of obstacles) {
        if (
            birdX + birdWidth > obstacle.x &&
            birdX < obstacle.x + obstacle.width &&
            (birdY < obstacle.top || birdY + birdHeight > obstacle.top + obstacle.bottom)
        ) {
            return true; // Collision
// Start the game loop
gameLoop();
