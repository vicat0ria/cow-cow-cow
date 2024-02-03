const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const userSize = 50;
const targetLocation = { x: 100, y: 100 };
let userLocation = { x: 50, y: 50 };
let hasWon = false; 

function loadGame() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    draw(); 
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw user
    ctx.fillStyle = 'white';
    ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);

    if (hasWon) {
        ctx.fillStyle = 'red';
        ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);
    }

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x &&
        userLocation.y == targetLocation.y) {
        alert('Congratulations! You found the hidden object. You won!');
        resetGame();
    }

    requestAnimationFrame(draw);
}

function resetGame() {
    userLocation = { x: 50, y: 50 };
}

document.addEventListener('keydown', (event) => {
    const speed = 50;

    switch (event.key) {
        case 'ArrowUp':
            userLocation.y -= speed;
            break;
        case 'ArrowDown':
            userLocation.y += speed;
            break;
        case 'ArrowLeft':
            userLocation.x -= speed;
            break;
        case 'ArrowRight':
            userLocation.x += speed;
            break;
    }
});