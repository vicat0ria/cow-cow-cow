const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const userSize = 100;
const targetLocation = { x: 300, y: 400 };
let userLocation = { x: 0, y: 0 };
let hasWon = false; 

function loadGame() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('coordinates').style.display = 'block';
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
    draw(); 
    getCoords();
}

function getCoords() {
    // Using AJAX to send the value to Flask
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/receive_value', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ value: userLocation.x }));
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
    userLocation = { x: 0, y: 0 };
}

document.addEventListener('keydown', (event) => {
    const speed = 100;

    // update the location on screen 
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

    // alert for the boundaries
    if (userLocation.x < 0) {
        alert('beyond the wall');
        resetGame();
    }

    // update the location: for testing purposes
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
});