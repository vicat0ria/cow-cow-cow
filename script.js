function loadGame() {
    document.getElementById('container').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';

    // loading the game canvas for playing 
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d'); // to define the game will be in 2d, allows for the filling and other properties

    const boxSize = 50;
    let userLocation = { x: 50, y: 50 };
    let hiddenObjectLocation = {x: 100, y: 100}; // hard coded for testing purposes
    let hasWon = false;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // the user will be white -> change depending on the UI design
    ctx.fillStyle = 'white';
    ctx.fillRect(userLocation.x, userLocation.y, boxSize, boxSize);

    // show the hidden target if won
    if (hasWon) {
        ctx.fillStyle = 'red';
        ctx.fillRect(hiddenObjectLocation.x, hiddenObjectLocation.y, boxSize, boxSize);
    }

    // the user is in the target cell -> remember not just around but exactly on the cell
    if (!hasWon &&
        userLocation.x == hiddenObjectLocation.x &&
        userLocation.y == hiddenObjectLocation.y) {
        alert('Congratulations! You found the hidden object. You won!');
        hasWon = true;
    }

    document.addEventListener('keydown', (event) => {
        const speed = 10; // for testing; can be changed

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

}

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
        root.setProperty('--text-color', '#CCCCCC');
        root.setProperty('--background-color', '#1A1A1A');
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
        localStorage.setItem('navigationStack', JSON.stringify(navigationStack));

    }

    
    function goBack() {
        if (navigationStack.length > 1) {
            // Hide the current page
            let currentPageId = navigationStack.pop();
            document.getElementById(currentPageId).style.display = 'none';
            // Show the previous page
            let previousPageId = navigationStack[navigationStack.length - 1];
            document.getElementById(previousPageId).style.display = 'flex';
            // Update localStorage
            localStorage.setItem('navigationStack', JSON.stringify(navigationStack));
        }
    }
    
    // // Ensure all pages except the first in the navigationStack are hidden initially
    // document.addEventListener('DOMContentLoaded', () => {
    //     navigationStack = ['container']; // Reset stack to initial state if needed
    //     // Optionally, setup initial visibility state of pages here
    // });
    