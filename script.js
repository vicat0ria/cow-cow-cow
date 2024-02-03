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
    playMusic();
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw user
    ctx.fillStyle = 'white';
    ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);

    //playMusic();

    //Start music
    // document.querySelector(".menu-button").addEventListener("click", () => {
    //     loadGame();
    //     music.finish.play();
    // })


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
            playStep();
            break;
        case 'ArrowDown':
            userLocation.y += speed;
            playStep();
            break;
        case 'ArrowLeft':
            userLocation.x -= speed;
            playStep();
            break;
        case 'ArrowRight':
            userLocation.x += speed;
            playStep();
            break;
    }
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

// var music = {
//     finish: new Howl({
//         src: [
//             '\music1.mp3',
//             //'C:\Users\victo\Desktop\projects\cow-cow-cow\audio\music1.mp3',
//         ],
//         loop: true, 
//         onload: function () {
//             // This function will be called once the sound is loaded and can be played
//             console.log('Sound loaded and ready to play!');
//             // You can perform additional actions here
//             music.finish.play();
//         }        
//     })
// }

var music = {
    level0: new Howl({
        src: ['/audio/music1.mp3'],
        loop: true,
        volume: 0.075,
    }),
    level1: new Howl({
        src: ['/audio/music1.mp3'],
        loop: true
    }),
    level2: new Howl({
        src: ['/audio/music1.mp3'],
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

playMusic1();

function playMusic1(){
    music.level0.play();
}
function playStep(){
    sfx.step.play();
}

