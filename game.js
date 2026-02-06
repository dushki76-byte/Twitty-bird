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

// Key press for bird flap
document.addEventListener("keydown", () => {
    birdVelocity = birdFlapStrength;
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
            return true; // Collision detected
        }
    }
    return false;
}

function updateBird() {
    birdVelocity += gravity; // Apply gravity
    birdY += birdVelocity; // Update bird position

    if (birdY < 0) birdY = 0; // Prevent bird from going off top
    if (birdY + birdHeight > canvas.height) birdY = canvas.height - birdHeight; // Prevent bird from going off bottom
}

function drawBird() {
    ctx.fillStyle = "#ff0";
    ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
}

function drawObstacles() {
    ctx.fillStyle = "#008000";
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.top); // Top pipe
        ctx.fillRect(obstacle.x, canvas.height - obstacle.bottom, obstacle.width, obstacle.bottom); // Bottom pipe
    }
}

function drawScore() {
    ctx.fillStyle = "#000";
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + obstacles.length, 10, 30);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen

    // Create first obstacle and make it impossible to pass
    if (obstacles.length === 0) {
        createObstacle();
    }

    if (obstacles[0].x < 70) { // Position the first obstacle to be unpassable
        obstacles[0].top = 100;
        obstacles[0].bottom = 100;
    }

    moveObstacles();
    updateBird();
    drawBird();
    drawObstacles();
    drawScore();

    if (checkCollisions()) {
        alert("Game Over! You hit the first obstacle!");
        obstacles = []; // Reset obstacles to restart the game
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
