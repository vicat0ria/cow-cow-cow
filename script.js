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
    // playMusic1();
    startMusic();
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw user
    ctx.fillStyle = 'white';
    ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);

    levelDecision(1);

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x &&
        userLocation.y == targetLocation.y) {
        music.level0.stop();
        playSuccess();   
        alert('Congratulations! You found the hidden object.');
        resetGame();
    }

    requestAnimationFrame(draw);
}

function startMusic(){
    //0.16, 0.2, 0.25, 0.33, 0.5, 1
    var maxVolume = 6;
    var step = 1 / maxVolume;
    //var volumeLevel = 1 / ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / 150);
    var volumeLevel = step * ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / 150);
    volumeLevel = 1 - volumeLevel + step;
    console.log(volumeLevel);
    sfx.step.volume(0.1);
    //sfx.step.volume(volumeLevel);
    music.level0.volume(volumeLevel);
    playMusic1();
}

function changeVolume(){
    var maxVolume = 6;
    var step = 1 / maxVolume;
    console.log(userLocation.x, targetLocation.x, userLocation.y, targetLocation.x)
    //var volumeLevel = 1 / ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / 150);
    var volumeLevel = step * ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / 150);
    volumeLevel = 1 - volumeLevel + step;
    //sfx.step.volume(volumeLevel);
    music.level0.volume(volumeLevel);
    console.log(volumeLevel);
}

function resetGame() {
    userLocation = { x: 50, y: 50 };
}

var hit = true;

document.addEventListener('keydown', (event) => {
    const speed = 150;
    // update the location on screen 
    switch (event.key) {
        case 'ArrowUp':
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, -150)){
                userLocation.y -= speed;
                hit = false;
            } else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowDown':
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, 150)){
                userLocation.y += speed;
                hit = false;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowLeft':
            if (!checkWallCollision(userLocation.x, userLocation.y, -150, 0)){
                userLocation.x -= speed;
                hit = false;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowRight':
            if (!checkWallCollision(userLocation.x, userLocation.y, 150, 0)){
                userLocation.x += speed;
                hit = false;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
    }
    customAlertForBoundaries();
    if(sfx.step.playing()){
        sfx.step.stop();
    }
    changeVolume();
    if(!hit){
        playStep();
    }

    // update the location: for testing purposes
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
});
function loadUserId() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('create-user-id').style.display = 'flex';
    announcePageChange('User ID  page');
    updateTitleAndHeading('Input User ID', 'key-bind-heading');
}
    
    let navigationStack = ['container']; // Initial page

function customAlertForBoundaries(){
    // customized alert for boundaries
    if (userLocation.x < 0) {
        console.log('You are hitting the left wall');
        userLocation.x = userLocation.x + 150;
        hit = true;
    }
    if (userLocation.x > 500) {
        console.log('You are hitting the right wall');
        userLocation.x = userLocation.x - 150;
        hit = true;
    }
    if (userLocation.y < 0) {
        console.log('You are hitting the top wall');
        userLocation.y = userLocation.y + 150;
        hit = true;
    }
    if (userLocation.y > 500) {
        console.log('You are hitting the bottom wall');
        userLocation.y = userLocation.y - 150;
        hit = true;
    }
}

var music = {
    level0: new Howl({
        src: './audio/level1.mp3',
        loop: true,
        volume: 0,
        preload: true,
    }),
}

var sfx = {
    step: new Howl({
        src: './audio/step.mp3',
        volume: 0,
        preload: true,
    }),
    success: new Howl({
        src: './audio/success_editted.mp3',
    }),
    coin: new Howl({
        src: './audio/coin-collected.mp3',
    }),
}


function playMusic1(){
    music.level0.play();
}

function playStep(){
    sfx.step.play();
}

function playSuccess(){
    sfx.success.volume(0.5);
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
            break;
        case 2: 
            targetLocation = { x: 150, y: 450 };
            userSize = 150;
            addWalls(2);
            break;
        case 3:
            targetLocation = { x: 450, y: 0};
            userSize = 150;
            break;
        case 4: 
            targetLocation = { x: 150, y: 450};
            userSize = 150;
            break;
        case 5: 
            targetLocation = { x: 480, y: 360};
            userSize = 120; 
            break; 
    }
}

function addWalls(level) {
    switch(level) {
        case 2:
            walls = [];
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 150, userSize, userSize*3);
            ctx.fillRect(300, 0, userSize, userSize*2);
            walls.push([0,1],[0,2],[0,3],[2,0],[2,1]);
            break;
        case 3:
            walls = [];
            ctx.fillStyle = 'black';
            ctx.fillRect();
            ctx.fillRect();
            walls.push();
            break;
    }
}
 
function checkWallCollision(x, y, xMove, yMove) {
    for (const wall of walls) {
        const wallX = wall[0] * userSize;
        const wallY = wall[1] * userSize;
        if (
            x + xMove == wallX &&
            y + yMove == wallY
        ) {
            return true;
        }
    
        // Set focus to the new section for accessibility
        const targetSection = document.getElementById(pageId);
        if (targetSection) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.removeAttribute('tabindex');
        }
    
        // Announce the page change to screen readers
        announcePageChange(pageId, isBackNavigation);
    }
}
      
// Adjusted to accept a 'isBackNavigation' parameter
function announcePageChange(pageId, isBackNavigation = false) {
    let readablePageId = pageId.replace(/-/g, ' ').replace('container', 'homepage'); // Custom mapping
    let actionVerb = isBackNavigation ? 'returned to' : 'navigated to';
    let message = `You have ${actionVerb} the ${readablePageId}.`;

    const announcer = document.getElementById('accessibilityAnnouncer');
    if (announcer) {
        announcer.textContent = message;
    }
}


function updateTitleAndHeading(newTitle, headingId) {
    document.title = newTitle; // Update the tab/window title
    const heading = document.getElementById(headingId);
    if (heading) {
        heading.focus(); // Move focus to the new heading
    }
}
