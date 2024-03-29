# Accessbility Maze Game Team 02

## Members
Victoria Miteva, Luis Olmos, Vaishnavi Sen, Thomas Chor, Anastasiia Kiseleva

## Purpose of the Game
- The purpose of creating this game for individuals with visual impairments is to promote inclusivity and accessibility in the gaming experience – addressing the need for immersive entertainment to foster a sense of independence and enjoyment in interactive digital environments.

## Game Description
- A multi-level maze game (web application) based strictly on auditory cues.
- Unique Features: 
    - All instructions are visible/readable by OS text-to-speech
    - *Settings features:* Font Size, Color Contrast, Change Key-Bindings 
    - Game is designed to be fair for all visually-impaired players
    - Leaderboards for a fun and competitive experience
    - Multi-Leveled - replayability
    - Save progress and pause game option at any given point

## Playing Instructions
- *Controls:* Arrow keys on Keyboard. Users can change it on the settings page. 
- In each level, immerse yourself in the music and locate the hidden object on the screen by relying on the audio cues.
- As you move closer to the target, the music will get louder, and it will decrease as you move away.
- Using Headphones is recommended for the best gaming experience. 

## Levels and Progression

- Levels 0 and 1 are obstacle-free, while subsequent levels introduce preset obstacles on the map.
- No sound indicates hitting a wall or boundary; listen for the 'step' sound to ensure proper movement.
- Upon successfully finding the hidden object, a victory sound effect will play, prompting you to advance to the next level.

## Obstacles 
- The preset levels include walls which prohibit the users from moving forward and deadends that add extra challenge. 
- Users are expected to find another way to reach the object. 

## Leaderboard scoring

- Users are ranked based on the time it took them to finish a particular level. 


## Prequisites 

- A modern web browser with JavaScript enabled
- Internet connection

## Installation

1. Clone the repository:

SSH:
`git clone git@github.com:vicat0ria/cow-cow-cow.git`

HTTPS:
`git clone https://github.com/vicat0ria/cow-cow-cow.git`

2. Navigate to the project directory:
`cd cow-cow-cow`

3. Install dependencies:

Windows: `pip install pandas`,`pip install Flask`

MacOS: `pip2 install pandas`, `pip3 install Flask`

4. Run the application:

Windows: `python app.py`

MacOS: `python3 app.py`

5. Open your web browser and navigate to `http://127.0.0.1:5000` to start playing!

## Program Specifications

- *Languages:* HTML, CSS, JavaScript, Python
- *Frameworks:* Flask
- *Libraries and APIs:* Howler.js, Pandas, NumPy, Requests
- *OS level a11y APIs:* text-to-speech

## Algorithms and Functions used
- loadGame(): Called when the player begins the game. It sets up the screen depeding on what option is selected. This is done by hiding the HTML elements and displaying the required ones. 
- draw(): Sets up the canvas, including target, user, background. Continuously calls the levelDecision() to continue the game in a loop, while making the required changes.
- levelDecision(): sets customized location for target and userSize depending on the chosen level. This calls addWalls() if the level has any obstacles. 
- addWalls(): Depending on which level the user is on, the walls and others obstacles are added to the game. This is achieved using fillRect from canvas.getContext() -> an HTML element. Also, pushes the decided walls into an array for use in later functions.
- checkWallCollisions(): uses the walls from the array to check if the user is in any of the coordinates in the array. If they are not, they can continue the game and if they are, it gives them an indication about it. 
- customAlertForBoundaries(): Sends a custom message to the user saying which bounndary wall they have hit to play accordingly. 
- EventListener for 'keydown' to see which arrow key is clicked. There is a check for wall collision and the user is prompted with instructions using the audio cues. 
- Different music auidos are used to indicate 'success', 'go ahead' and also the background music to find the target. 

## Accessibility features/ADA compliance

- Performed user-testing using the keyboard and OS text-to-speech tool
- Project follows HTML semantic guidelines

## Improvements if time permits

- Establishing a database for secure data retrieval.


## Additional Features

- As players advance through increasingly difficult levels, our future plans involve introducing a greater variety of obstacles. One proposed addition is the inclusion of fire hazards within the game. These hazards pose a threat to users, causing their character to be "killed" and resetting their progress for the current level. If a user experiences three or more deaths in a single level, their overall progress will be reduced by two levels. 

- We would like to develop a theme or story for the game, besides additional characters, graphics, sounds, etc. This also supports multiplayer mode. 

- We are keen on integrating voice commands to enhance the game's accessibility by eliminating the need for traditional keyboard inputs. These voice commands could be utilized to communicate game instructions and assist users in navigating through different levels, while also giving them a chance to speak what moves they want to make. This will also make loggin into the accounts easier for users without keyboard. 

- To enhance the game's excitement, we aim to explore the possibility of randomizing key elements such as the target location, user starting position, and the placement of obstacles on the map. 


# testing stuff - will remove