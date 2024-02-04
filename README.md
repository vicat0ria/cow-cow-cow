# Accessbility Maze Game Team 02

## Playing Instructions
- Controls: Keyboard
- In each level, immerse yourself in the music and locate the hidden object on the screen by relying on the audio cues.
- As you move closer to the target, the music will get louder, and it will decrease as you move away.
- Levels 0 and 1 are obstacle-free, while subsequent levels introduce preset obstacles on the map.
- No sound indicates hitting a wall or boundary; listen for the 'step' sound to ensure proper movement.
- Upon successfully finding the hidden object, a tone will play, prompting you to advance to the next level.

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

This program utilizes HTML, CSS, and JavaScript for the frontend game mechanics and styling. Python, specifically Flask, is employed to run the program on the localhost server. Data is stored and retrieved from a .csv file.

## Improvements if time permits

- Establishing a database for secure data retrieval.


## Additional Features

- As players advance through increasingly difficult levels, our future plans involve introducing a greater variety of obstacles. One proposed addition is the inclusion of fire hazards within the game. These hazards pose a threat to users, causing their character to be "killed" and resetting their progress for the current level. If a user experiences three or more deaths in a single level, their overall progress will be reduced by two levels. 

- We are keen on integrating voice commands to enhance the game's accessibility by eliminating the need for traditional keyboard inputs. These voice commands could be utilized to communicate game instructions and assist users in navigating through different levels, while also giving them a chance to speak what moves they want to make. 

- To enhance the game's excitement, we aim to explore the possibility of randomizing key elements such as the target location, user starting position, and the placement of obstacles on the map. 
