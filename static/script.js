const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
var walls = [];

var userSize;
var targetLocation;
let userLocation = { x: 0, y: 0 };
let hasWon = false; 
var level = 0;

var stopwatchInterval;
var seconds = 0;
var minutes = 0;
var hours = 0;

var formattedTime;

var music = {
    level0: new Howl({
        src: ['static/audio/level1.mp3'],
        loop: true,
        volume: 0,
        preload: true,
    }),
}
var sfx = {
    step: new Howl({
        src: ['static/audio/step.mp3'],
        volume: 0,
        preload: true,
    }),
    success: new Howl({
        src: ['static/audio/success_editted.mp3'],
    }),
    coin: new Howl({
        src: ['static/audio/coin-collected.mp3'],
    }),
}
function playMusic1(){
    music.level0.play();
}
function playStep(){
    sfx.step.play();
}
function playSuccess(){
    // sfx.success.volume(1);
    sfx.success.play();
}  

function checkKey() {
    document.addEventListener('keydown', function(event) { // Explicitly pass the event object
        if (event.key === "Enter") {
            loadLevelSelection();
            navigateTo('level-select');
        }
    }, { once: true }); // Use the `{ once: true }` option so the listener is removed after firing once
}

function loadGame() {
    // levelDecision(1);
    navigateTo('game-container');
    document.getElementById('container').style.display = 'none';
    document.getElementById('game-container').style.display = 'flex';
    document.getElementById('gameCanvas').style.display = 'flex';
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
    announcePageChange('Game');
    updateTitleAndHeading('Game screen', 'game-level-heading');
    draw(); 
    startMusic();
    startStopwatch();
}
function loadSettings() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('settings').style.display = 'flex';
    announcePageChange('Game Settings page');
    updateTitleAndHeading('Game Settings', 'settings-heading');
}
function loadFontSizeSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('font-size-settings').style.display = 'flex';
    announcePageChange('Font Size Settings page');
    updateTitleAndHeading('Font Size Settings', 'font-size-heading');
}
function loadColorContrastSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('color-contrast-settings').style.display = 'flex';
    announcePageChange('Color contrast settings page');
    updateTitleAndHeading('Color contrast Settings', 'color-contrast-heading');
}
function loadKeyBindSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('key-bind-settings').style.display = 'flex';
    announcePageChange('Key Bind settings page');
    updateTitleAndHeading('Key Bind Settings', 'key-bind-heading');
}
function loadUserId() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('create-user-id').style.display = 'flex';
    announcePageChange('User ID page');
    updateTitleAndHeading('Input User ID', 'create-user-id-heading');
}
function loadLevelSelection(){
    document.getElementById('create-user-id').style.display = 'none';
    document.getElementById('level-select').style.display = 'flex';
    announcePageChange('Level select page');
    updateTitleAndHeading('Select a Level', 'level-select-header');
}

function getCoords() {
    // Using AJAX to send the value to Flask
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/receive_value', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    var coords = {
        userX: userLocation.x,
        userY: userLocation.y,
        targetX: targetLocation.x,
        targetY: targetLocation.y,
        lvl_curr: level,
        time: formattedTime
    };
    xhr.send(JSON.stringify(coords));
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
    document.getElementById('current-level').innerHTML = level;
    levelDecision(level);

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x && userLocation.y == targetLocation.y) {
        music.level0.stop();
        playSuccess();  
        level++;
        resetGame();
        changeVolume();
        alert("next level");
        changeVolume();
        startMusic();
        changeVolume();
    }
    
    getCoords();
    requestAnimationFrame(draw);
    console.log(seconds)
}

function resetGame() {
    userLocation = { x: 0, y: 0 };
    document.getElementById('x-coordinate').innerHTML = 0; 
    document.getElementById('y-coordinate').innerHTML = 0;
    music.level0.stop();
}

function startMusic(){
    var maxVolume;
    if(level <= 4){
        maxVolume = 6;
    } else if(level >= 5 && level < 10){
        maxVolume = 8;
    }
    var step = 1 / maxVolume;
    var volumeLevel = step * ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / userSize);
    volumeLevel = 1 - volumeLevel + step;
    music.level0.volume(volumeLevel);
    sfx.step.volume(0.1);
    //sfx.step.volume(volumeLevel);
    playMusic1();
}

function changeVolume(){
    var maxVolume;
    if(level <= 4){
        maxVolume = 6;
    } else if(level >= 5 && level < 10){
        maxVolume = 8;
    }
    var step = 1 / maxVolume;
    var volumeLevel = step * ((Math.abs(userLocation.x - targetLocation.x) + Math.abs(userLocation.y - targetLocation.y)) / userSize);
    volumeLevel = 1 - volumeLevel + step;
    //sfx.step.volume(volumeLevel);
    music.level0.volume(volumeLevel);
}

var hit = true;
document.addEventListener('keydown', (event) => {
    // const speed = 150;
    // update the location on screen 
    switch (event.key) {
        case 'ArrowUp':
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, -1*userSize)){
                userLocation.y -= userSize;
                hit = false;
            } else {hit = true}; // will be changed to voice commands
            break;
        case 'ArrowDown':
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, userSize)){
                userLocation.y += userSize;
                hit = false;
            }
            else {hit = true}; // will be changed to voice commands
            break;
        case 'ArrowLeft':
            if (!checkWallCollision(userLocation.x, userLocation.y, -1*userSize, 0)){
                userLocation.x -= userSize;

                hit = false;
            }
            else {hit = true}; // will be changed to voice commands
            break;
        case 'ArrowRight':
            if (!checkWallCollision(userLocation.x, userLocation.y, userSize, 0)){
                userLocation.x += userSize;

                hit = false;
            }
            else {hit = true}; // will be changed to voice commands
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

function startMusic(){
    console.log(userLocation.x, targetLocation.x, userLocation.y, targetLocation.x)
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

var music = {
    level0: new Howl({
        src: ['static/audio/level1.mp3'],
        loop: true,
        volume: 0,
        preload: true,
    }),
}

var sfx = {
    step: new Howl({
        src: ['static/audio/step.mp3'],
        volume: 0,
        preload: true,
    }),
    success: new Howl({
        src: ['static/audio/success.mp3'],
    }),
    coin: new Howl({
        src: ['static/audio/coin-collected.mp3'],
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
            addWalls(3);
            break;
        case 4: 
            targetLocation = { x: 300, y: 300};
            userSize = 150;
            addWalls(4);
            break;
        case 5: 
            targetLocation = { x: 480, y: 360};
            userSize = 120; 
            addWalls(5);
            break;  
        default: 
            targetLocation = { x: 450, y: 0 };
            userSize = 150;
            addWalls();
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
            ctx.fillRect(150, 0, userSize, userSize);
            ctx.fillRect(450, 150, userSize, userSize);
            ctx.fillRect(0, 300, userSize*4, userSize*2);
            walls.push([1,0], [3,1], [0,2], [1,2], [2,2], [3,2]);
            break;
        case 4:
            walls = [];
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 150, userSize*2, userSize*3);
            ctx.fillRect(450, 150, userSize, userSize*3);
            ctx.fillRect(300, 450, userSize, userSize);
            walls.push([0,1],[1,1],[3,1],[0,2],[1,2],[1,3],[0,3],[1,3],[2,3],[3,3],[3,2]);
            break;
        case 5:
            walls = [];
            ctx.fillStyle = 'black';
            ctx.fillRect(120,0, userSize, userSize*2);
            ctx.fillRect(240, 120, userSize*2, userSize);
            ctx.fillRect(480, 0, userSize, userSize);
            ctx.fillRect(120, 360, userSize, userSize*2);
            ctx.fillRect(360, 360, userSize, userSize*2);
            ctx.fillRect(480, 480, userSize, userSize);
            walls.push([1,0],[1,1],[2,1],[3,1],[4,0],[1,3],[1,4],[3,3],[3,4],[4,4]);
            break;
        default:
            walls = [];
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 150, userSize, userSize*3);
            ctx.fillRect(300, 0, userSize, userSize*2);
            walls.push([0,1],[0,2],[0,3],[2,0],[2,1]);
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
    }

    return false;
}


function changeFontSize(size) {
    let root = document.documentElement;

    if (size === 'small') {
        root.style.setProperty('--h1-font-size', '2em'); // Smaller size for h1
        root.style.setProperty('--h2-font-size', '1.5em'); // Smaller size for h2
        root.style.setProperty('--button-font-size', '16px'); // Smaller size for buttons
        root.style.setProperty('--span-font-size', '16px');
        root.style.setProperty('--width', '350px');
      } else if (size === 'medium') {
        root.style.setProperty('--h1-font-size', '3em'); // Medium size for h1
        root.style.setProperty('--h2-font-size', '2em'); // Medium size for h2
        root.style.setProperty('--button-font-size', '25px'); // Medium size for buttons
        root.style.setProperty('--span-font-size', '20px');
        root.style.setProperty('--width', '350px');
      } else if (size === 'large') {
        root.style.setProperty('--h1-font-size', '3.5em'); // Larger size for h1
        root.style.setProperty('--h2-font-size', '2.5em'); // Larger size for h2
        root.style.setProperty('--button-font-size', '35px'); // Larger size for buttons
        root.style.setProperty('--span-font-size', '25px');
        root.style.setProperty('--width', '430px');
      }
      // Optionally, save the user's preference to localStorage or handle it as needed
    }

function changeColorScheme(scheme) {
    const root = document.documentElement.style;
  
    switch (scheme) {
      case 'default':
        root.setProperty('--text-color', '#000000');
        root.setProperty('--background-color', '#FFFFFF');
        root.setProperty('--border-color', '#000000')
        break;
      case 'dark':
        root.setProperty('--text-color', '#F1F3F4');
        root.setProperty('--background-color', '#202124');
        root.setProperty('--border-color', '#F1F3F4')
        break;
      case 'yellowBlue':
        root.setProperty('--text-color', '#FAFF00');
        root.setProperty('--background-color', '#113270');
        root.setProperty('--border-color', '#FAFF00')
        break;
    }
  }
  
    
let navigationStack = ['container']; // Initial page

function navigateTo(pageId, isBackNavigation = false) {
    // Hide the current page
    if (navigationStack.length > 0) {
        const currentTopId = navigationStack[navigationStack.length - 1];
        document.getElementById(currentTopId).style.display = 'none';
    }

    // Show the new page
    document.getElementById(pageId).style.display = 'flex';

    if (!isBackNavigation) { // Only push to stack if not navigating back
        // Push the new page onto the stack, if not already there as the last entry
        if (navigationStack[navigationStack.length - 1] !== pageId) {
            navigationStack.push(pageId);
        }
    }

    // Focus management
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
        targetSection.setAttribute('tabindex', '-1');
        targetSection.focus();
        targetSection.removeAttribute('tabindex');
    }

    // Announce the page change to screen readers correctly
    announcePageChange(pageId, isBackNavigation);
}
    
function goBack() {
    if (navigationStack.length > 1) {
        music.level0.stop();
        // Remove the current page from the stack
        const currentPageId = navigationStack.pop();
        document.getElementById(currentPageId).style.display = 'none';

        // Show the previous page
        const previousPageId = navigationStack[navigationStack.length - 1];
        document.getElementById(previousPageId).style.display = 'flex';

        // Correctly focus and announce the back navigation
        const targetSection = document.getElementById(previousPageId);
        if (targetSection) {
            targetSection.setAttribute('tabindex', '-1');
            targetSection.focus();
            targetSection.removeAttribute('tabindex');
        }

        // The true flag indicates back navigation
        navigateTo(previousPageId, true);
    } else {
        // Handle no history case
        console.log("No more navigation history.");
    }
}
    
// Variable to keep track of which input is currently active
let currentKeyBindInput = null;

// List of specific input IDs you want to target
const inputIds = ['bind-up', 'bind-down', 'bind-left', 'bind-right'];

inputIds.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) { // Check if the element exists
        input.addEventListener('focus', function() {
            currentKeyBindInput = this; // Set the current input
            document.addEventListener('keydown', handleKeyBind);
        });

        input.addEventListener('blur', function() {
            document.removeEventListener('keydown', handleKeyBind);
            currentKeyBindInput = null; // Clear the current input
        });
    }
});


function handleKeyBind(e) {
    // Allow default behavior for the combination of Ctrl+R or Shift+Tab
    if ((e.key === 'r' && e.ctrlKey) || (e.key === 'Tab' && e.shiftKey)) {
        // Don't prevent the default action for these key combinations
        return; // Exit the function early
    }

    // Ignore Tab key alone to preserve its default focus navigation behavior
    if (e.key === 'Tab' || e.key === 'Shift') {
        return; // Exit the function early without preventing the default action
    }

    if (!currentKeyBindInput) return; // Do nothing if no input is selected

    currentKeyBindInput.value = e.key; // Assign the pressed key to the input's value
    e.preventDefault(); // Prevent the default action for all other keys
}

function saveKeyBindings() {
    keyBindings.up = document.getElementById('bind-up').value;
    keyBindings.down = document.getElementById('bind-down').value;
    keyBindings.left = document.getElementById('bind-left').value;
    keyBindings.right = document.getElementById('bind-right').value;

    // Optionally, save to local storage
    localStorage.setItem('keyBindings', JSON.stringify(keyBindings));
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
function loadUserId() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('create-user-id').style.display = 'flex';
    announcePageChange('User ID  page');
    updateTitleAndHeading('Input User ID', 'key-bind-heading');
}
    
function customAlertForBoundaries(){
    // customized alert for boundaries
    if (userLocation.x < 0) {
        console.log('You are hitting the left wall');
        userLocation.x = userLocation.x + userSize;
        hit = true;
    }
    if (userLocation.x > 500) {
        console.log('You are hitting the right wall');
        userLocation.x = userLocation.x - userSize;
        hit = true;
    }
    if (userLocation.y < 0) {
        console.log('You are hitting the top wall');
        userLocation.y = userLocation.y + userSize;
        hit = true;
    }
    if (userLocation.y > 500) {
        console.log('You are hitting the bottom wall');
        userLocation.y = userLocation.y - userSize;
        hit = true;
    }
}

function updateStopwatch() {
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
        }
    }
    formattedTime = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
    document.getElementById('stopwatch').innerText = formattedTime;
}

function startStopwatch() {
    stopwatchInterval = setInterval(updateStopwatch, 1000);
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('stopwatch').innerText = '00:00:00';
}

function padTime(time) {
    return time < 10 ? `0${time}` : time;
}
function pauseGame() {
    console.log("Game paused");
    // Implement pause functionality
}

function saveGame() {
    console.log("Game saved");
    // Implement save functionality
}
