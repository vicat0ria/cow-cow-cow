const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

var targetLocation;
let userLocation = { x: 0, y: 0 };
let hasWon = false; 
const userSize = 150;

function loadGame() {
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

    if (hasWon) {
        ctx.fillStyle = 'red';
        ctx.fillRect(userLocation.x, userLocation.y, userSize, userSize);
    }

    // Check if the user has reached the hidden object
    if (userLocation.x == targetLocation.x &&
        userLocation.y == targetLocation.y) {
        alert('Congratulations! You found the hidden object.');
        resetGame();
    }

    if (pageIndex === 1) {
        requestAnimationFrame(draw);
    }
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



function loadSettings() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('settings').style.display = 'flex';
}

function loadFontSizeSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('font-size-settings').style.display = 'flex';
}

function loadColorContrastSettings(){
    document.getElementById('settings').style.display = 'none';
    document.getElementById('color-contrast-settings').style.display = 'flex';
}


function changeFontSize(size) {
    let root = document.documentElement;

    if (size === 'small') {
        root.style.setProperty('--h1-font-size', '2em'); // Smaller size for h1
        root.style.setProperty('--h2-font-size', '1.5em'); // Smaller size for h2
        root.style.setProperty('--button-font-size', '16px'); // Smaller size for buttons
      } else if (size === 'medium') {
        root.style.setProperty('--h1-font-size', '3em'); // Medium size for h1
        root.style.setProperty('--h2-font-size', '2em'); // Medium size for h2
        root.style.setProperty('--button-font-size', '25px'); // Medium size for buttons
      } else if (size === 'large') {
        root.style.setProperty('--h1-font-size', '3.5em'); // Larger size for h1
        root.style.setProperty('--h2-font-size', '2.5em'); // Larger size for h2
        root.style.setProperty('--button-font-size', '35px'); // Larger size for buttons
      }
      // Optionally, save the user's preference to localStorage or handle it as needed
    }

function changeColorScheme(scheme) {
    const root = document.documentElement.style;
  
    switch (scheme) {
      case 'default':
        root.setProperty('--text-color', '#000000');
        root.setProperty('--background-color', '#FFFFFF');
        break;
      case 'dark':
        root.setProperty('--text-color', '#F1F3F4');
        root.setProperty('--background-color', '#202124');
        break;
      case 'yellowBlue':
        root.setProperty('--text-color', '#FAFF00');
        root.setProperty('--background-color', '#113270');
        break;
    }
  }
  
    
    let navigationStack = ['container']; // Initial page

    function navigateTo(pageId) {
        // Hide the current (top) page
        document.getElementById(navigationStack[navigationStack.length - 1]).style.display = 'none';
        // Show the new page
        document.getElementById(pageId).style.display = 'flex';
        // Push the new page onto the stack
        navigationStack.push(pageId);
    }

    
    function goBack() {
        if (navigationStack.length > 1) {
            // Hide the current page
            let currentPageId = navigationStack.pop();
            document.getElementById(currentPageId).style.display = 'none';
            // Show the previous page
            let previousPageId = navigationStack[navigationStack.length - 1];
            document.getElementById(previousPageId).style.display = 'flex';
        }
    }
    

    