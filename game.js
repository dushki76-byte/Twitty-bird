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
let obstacles = [];

// Event listener for clicks on the canvas to make the bird flap
canvas.addEventListener("click", () => {
    birdVelocity = birdFlapStrength; // When clicked, bird moves up
});

function createObstacle() {
    // Randomize the height of the gap
    let gapHeight = Math.random() * (canvas.height / 3) + 100; // Gap between pipes (min 100px)
    let topObstacleHeight = gapHeight; // Height of the top obstacle
    let bottomObstacleHeight = canvas.height - (gapHeight + 100); // Height of the bottom obstacle
    obstacles.push({
        x: canvas.width,
        top: topObstacleHeight,
        bottom: bottomObstacleHeight,
        width: 30
    });
}

function moveObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 2; // Move obstacles to the left
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
            (birdY < obstacle.top || birdY + birdHeight > canvas.height - obstacle.bottom)
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
    ctx.fillStyle = "#ff0"; // Yellow color for the bird
    ctx.fillRect(birdX, birdY, birdWidth, birdHeight);
}

function drawObstacles() {
    ctx.fillStyle = "#008000"; // Green color for obstacles
    for (let obstacle of obstacles) {
        ctx.fillRect(obstacle.x, 0, obstacle.width, obstacle.top); // Top pipe
        ctx.fillRect(obstacle.x, canvas.height - obstacle.bottom, obstacle.width, obstacle.bottom); // Bottom pipe
    }
}

function drawScore() {
    ctx.fillStyle = "#000"; // Black color for text
    ctx.font = "20px Arial";
    ctx.fillText("Score: " + obstacles.length, 10, 30); // Display score
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the screen

    // Create obstacles at random intervals
    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - 200) {
        createObstacle();
    }

    moveObstacles();
    updateBird();
    drawBird();
    drawObstacles();
    drawScore();

    if (checkCollisions()) {
        alert("Game Over! You hit the obstacle!");
        obstacles = []; // Reset obstacles to restart the game
    }

    requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
