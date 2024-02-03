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
