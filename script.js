const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var userSize;
var targetLocation;
let userLocation = { x: 0, y: 0 };
let hasWon = false; 

function loadGame(){
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;

    draw(); 
    // playMusic1();
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

    levelDecision(1);
    startMusic();

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x &&
        userLocation.y == targetLocation.y) {
        playSuccess();   
        music.level0.play();
        alert('Congratulations! You found the hidden object.');
        resetGame();
    }
    requestAnimationFrame(draw);
}

function startMusic(){
    var volumeLevel = 1 / (Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y));
    console.log(volumeLevel);
    music.level0.volume(volumeLevel);
    playMusic1();
}

function changeVolume(){
    var volumeLevel = 1 / (Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y));
    music.level0.volume(volumeLevel);
}

function resetGame() {
    userLocation = { x: 0, y: 0 };
    document.getElementById('x-coordinate').innerHTML = 0; 
    document.getElementById('y-coordinate').innerHTML = 0;
}

document.addEventListener('keydown', (event) => {
    const speed = 150;

    // update the location on screen 
    switch (event.key) {
        case 'ArrowUp':
            userLocation.y -= speed;
            if(sfx.step.playing()){
                sfx.step.stop();
            }
            playStep();
            changeVolume();
            break;
        case 'ArrowDown':
            userLocation.y += speed;
            if(sfx.step.playing()){
                sfx.step.stop();
            }
            playStep();
            changeVolume();
            break;
        case 'ArrowLeft':
            userLocation.x -= speed;
            if(sfx.step.playing()){
                sfx.step.stop();
            }
            playStep();
            changeVolume();
            break;
        case 'ArrowRight':
            userLocation.x += speed;
            if(sfx.step.playing()){
                sfx.step.stop();
            }
            playStep();
            changeVolume();
            break;
    }

    // customized alert for boundaries
    if (userLocation.x < 0) {
        console.log('You are hitting the left wall');
        userLocation.x = userLocation.x + 150;
    }
    if (userLocation.x > 500) {
        console.log('You are hitting the right wall');
        userLocation.x = userLocation.x - 150;
    }
    if (userLocation.y < 0) {
        console.log('You are hitting the top wall');
        userLocation.y = userLocation.y + 150;
    }
    if (userLocation.y > 500) {
        console.log('You are hitting the bottom wall');
        userLocation.y = userLocation.y - 150;
    }

    // update the location: for testing purposes
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
});


//Sound
var sfx = {
    push: new Howl({
        src: [
            '',
        ],
        loop: true,
        oneend: function() {
            console.log("Done playing sfx")
        }
    })
}

var music = {
    level0: new Howl({
        src: ['/audio/level1.mp3'],
        loop: true,
        volume: 0,
    }),
    level1: new Howl({
        src: ['/audio/level1.mp3'],
        loop: true
    }),
    level2: new Howl({
        src: ['/audio/level1.mp3'],
        loop: true
    }),
}

var sfx = {
    step: new Howl({
        src: ['/audio/step.mp3'],
    }),
    success: new Howl({
        src: ['/audio/success.mp3'],
    }),
    coin: new Howl({
        src: ['/audio/coin-collected.mp3'],
    }),
}

// var volumeLevel = 1/(abs(userLocation.x - targetLocation.x)+ abs(userLocation.y - targetLocation.y));
// console.log(volumeLevel);

function playMusic1(){
    music.level0.play();
}

function playStep(){
    sfx.step.play();
}

function playSuccess(){
    sfx.success.play();
}   


function levelDecision(level) {
    switch(level) {
        case 0: 
            targetLocation = { x: 450, y: 0 };
            userSize = 150;
            break;
        case 1: 
            targetLocation = { x: 450, y: 450 };
            userSize = 150;
            // addWalls(2);
            break;
    }
}

// function addWalls(level) {
//     switch(level) {
//         case 2:
//             ctx.beginPath();
//             ctx.moveTo(0, 150);
//             ctx.lineTo(150, 150);
//             ctx.lineTo(150, 600);
//             ctx.lineWidth = 10;
//             ctx.strokeStyle = "pink";
//             ctx.stroke();
//             ctx.moveTo(300, 0);
//             ctx.lineTo(300, 450);
//             ctx.lineWidth = 10;
//             ctx.strokeStyle = "pink";
//             ctx.stroke();
//     }
// }
