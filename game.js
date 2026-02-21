const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = 500;
canvas.height = 500;

let plantHeight = 30; // Initial height of the plant
let plantGrowthRate = 2; // Rate at which the plant grows when fed
let fruits = []; // Array to hold the fruits
let bucket = { x: 400, y: 400, width: 50, height: 50 }; // Bucket to store fruits
let energy = 0; // Track how much energy has been given to the plant
let gameOver = false; // Track if the game is over

// Plant position in the center of the canvas
let plantX = canvas.width / 2 - 25;
let plantY = canvas.height / 2 + 50;

// Plant image (we will just use a simple rectangle for now)
let plantColor = "#228B22"; // Green for the plant color

// Fruit properties
let fruitColor = "#FFD700"; // Yellow fruit color
let fruitRadius = 10; // Size of the fruit
let fruitInterval = 100; // Interval at which fruits appear

// Click detection for plucking fruit
canvas.addEventListener("click", function(event) {
    if (!gameOver) {
        // Check if click is on any fruit
        for (let i = 0; i < fruits.length; i++) {
            let fruit = fruits[i];
            let distance = Math.sqrt(Math.pow(event.offsetX - fruit.x, 2) + Math.pow(event.offsetY - fruit.y, 2));
            if (distance < fruitRadius) {
                // Remove the fruit from the array when plucked
                fruits.splice(i, 1);
                break;
            }
        }
    }
});

// Feed button event
document.getElementById("feedButton").addEventListener("click", feedPlant);

function feedPlant() {
    if (gameOver) return;

    energy++; // Increase the energy when the feed button is clicked

    // Grow the plant
    if (energy > 0) {
        plantHeight += plantGrowthRate; // Increase plant height
    }

    // Start producing fruits after a certain height
    if (plantHeight > 50 && fruits.length < 5) {
        // Add fruit randomly around the plant
        let fruitX = Math.random() * 40 + plantX - 20; // Random x position near the plant
        let fruitY = Math.random() * 50 + plantY - 30; // Random y position near the plant
        fruits.push({ x: fruitX, y: fruitY });
    }
}

function drawPlant() {
    ctx.fillStyle = plantColor;
    ctx.fillRect(plantX, canvas.height - plantHeight - 50, 50, plantHeight); // Draw plant
}

function drawFruits() {
    ctx.fillStyle = fruitColor;
    for (let i = 0; i < fruits.length; i++) {
        ctx.beginPath();
        ctx.arc(fruits[i].x, fruits[i].y, fruitRadius, 0, Math.PI * 2); // Draw fruit as a circle
        ctx.fill();
    }
}

function drawBucket() {
    ctx.fillStyle = "#8B4513"; // Brown color for the bucket
    ctx.fillRect(bucket.x, bucket.y, bucket.width, bucket.height); // Draw the bucket
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    drawPlant(); // Draw the plant
    drawFruits(); // Draw the fruits
    drawBucket(); // Draw the bucket
    requestAnimationFrame(draw); // Redraw
}

// Start the game loop
draw();