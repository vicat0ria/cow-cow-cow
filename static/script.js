const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
var walls = [];

var userSize;
var targetLocation;
let userLocation = { x: 0, y: 0 };
let hasWon = false; 

function loadGame() {
    // levelDecision(1);
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('x-coordinate').innerHTML = userLocation.x; 
    document.getElementById('y-coordinate').innerHTML = userLocation.y;
    draw(); 
}

function draw() {
    // Clear the canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw user
    ctx.fillStyle = 'white';
    ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);

    levelDecision(2);

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x &&
        userLocation.y == targetLocation.y) {
        alert('Congratulations! You found the hidden object.');
        resetGame();
    }
    requestAnimationFrame(draw);
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
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, -150)){
                userLocation.y -= speed;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowDown':
            if (!checkWallCollision(userLocation.x, userLocation.y, 0, 150)){
                userLocation.y += speed;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowLeft':
            if (!checkWallCollision(userLocation.x, userLocation.y, -150, 0)){
                userLocation.x -= speed;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
            break;
        case 'ArrowRight':
            if (!checkWallCollision(userLocation.x, userLocation.y, 150, 0)){
                userLocation.x += speed;
            }
            else {console.log("Hitting the wall!")}; // will be changed to voice commands
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
    }

    return false;
}

function loadUserId() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('create-user-id').style.display = 'flex';
    announcePageChange('User ID  page');
    updateTitleAndHeading('Input User ID', 'key-bind-heading');
}
    
    let navigationStack = ['container']; // Initial page

    function navigateTo(pageId) {
        // Hide the current page
        if (navigationStack.length > 0) {
            const currentTopId = navigationStack[navigationStack.length - 1];
            document.getElementById(currentTopId).style.display = 'none';
        }
    
        // Show the new page
        document.getElementById(pageId).style.display = 'flex';
        // Push the new page onto the stack, if not already there as the last entry
        if (navigationStack[navigationStack.length - 1] !== pageId) {
            navigationStack.push(pageId);
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