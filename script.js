const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    color: 'blue',
};

let food = [];
const foodCount = 100;
const foodSpawnTime = 200; // Spawn food every 2000 ms (2 seconds)

// Function to generate food
function generateFood() {
    if (food.length < foodCount) {
        food.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: 5,
        });
    }
}

// Initial food generation
for (let i = 0; i < foodCount; i++) {
    generateFood();
}

// Handle mouse movement
canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    player.x = event.clientX - rect.left;
    player.y = event.clientY - rect.top;
});

// Collision detection
function checkCollision(player, foodItem) {
    const dx = player.x - foodItem.x;
    const dy = player.y - foodItem.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    return distance < player.radius + foodItem.radius;
}

// Update player size when eating food
function update() {
    for (let i = food.length - 1; i >= 0; i--) {
        if (checkCollision(player, food[i])) {
            player.radius += 1; // Increase size
            food.splice(i, 1); // Remove food
        }
    }
}

// Render the game
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw player
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.closePath();

    // Draw food
    food.forEach(item => {
        ctx.beginPath();
        ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'green';
        ctx.fill();
        ctx.closePath();
    });
}

// Game loop
function gameLoop() {
    update();
    render();
    requestAnimationFrame(gameLoop);
}

// Spawn food at regular intervals
setInterval(generateFood, foodSpawnTime);

gameLoop();
