# Space Invaders - Project One (GA)

This was my first ever big project, to end unit 1, where I had to make my first game. For this project, I chose to make Space Invaders. It was made with HTML, CSS  and JavaScript. I didn’t make it with any specific theme in mind, other than aliens and spaceships, but I gave a big importance to styling since I think it could make or break a project.

![game-screenshot](https://i.imgur.com/L5NB9s7.png)

## Deployment

The game has been deployed with GitHub Pages and is available [here](https://mafventura.github.io/Unit1_Project_Space_Invaders/).

## Getting started

The code is separated into the HTML index file, the CSS stylesheet and the JavaScript app.js.

The folder img folder has the pngs used for the game, and  some that were tested but not used.

You can access the source code via the 'Clone or download' button and then open the index.html file in your browser of choice to start the game.


## Goal and timeframe:
This was a solo project. We were given 4.5 days to make it.


## Technologies used:
* HTML5
* CSS3
* JavaScript
* GitHub


## Brief:
* **Render a game in the browser**
* **Be built on a grid: do not use HTML Canvas for this**
* **Design logic for winning** & **visually display which player won**
* **Include separate HTML / CSS / JavaScript files**
* Stick with **KISS (Keep It Simple Stupid)** and **DRY (Don't Repeat Yourself)** principles
* Use **Javascript** for **DOM manipulation**
* **Deploy your game online**, where the rest of the world can access it (we will do this together at the end of the project)
* Use **semantic markup** for HTML and CSS (adhere to best practices)
 - Requirements
* The player should be able to clear at least one wave of aliens
* The player's score should be displayed at the end of the game”

## Planning:



## Process
Day 01:
- Started by laying out the initial style for the background of the board and initial HTML.
- Started the basic skeleton of the JavaScript, trying to create the grid, and experimenting with the starting positions of elements.


```javascript
    function createGrid() {
   // grid info


   //create grid cells
   for (let i = 0; i < cellCount; i++) {
       const cell = document.createElement('div') //creating the cell divs
       cell.setAttribute('id', i) // text for guidance
       board.appendChild(cell) // appending the cells to the board
       cells.push(cell) // adding each cell to the cells array
   }


   score.innerText = `Score: ${playerScore}`


}

```

- Struggled with an error regarding the keyboard presses event listener

  Day 02:

  - Fixed the ship movement

```javascript
      function handleShipMovement(event) {


   const key = event.key


   const left = 'a'
   const right = 'd'


   removeClass(shipCurrentPosition, 'ship')


   if (key === right && shipCurrentPosition % width !== width - 1) {
       shipCurrentPosition += 1


   } else if (key === left && shipCurrentPosition % width !== 0) {
       shipCurrentPosition -= 1
   } else if (key === ' ') {
       shooting()
       shootSounds.play()
   }


   addClass(shipCurrentPosition, 'ship')


}

```

- Created the movement for the aliens
- Increased the grid to double the size (20x20)
- Chose which icons to have for the aliens and the ship

Day 03:
- Added the shooting function.
- Added a starting screen explaining the rules and a clickable start button.
- Currently struggling with DRY-ing the code and there’s a weird bug with the shooting.
- Added the end condition

Day 04:
- add the score and add an end screen

Day 05:
- fixed score
- fixed alien shooting
- added some sound effects

Day 06:
- tried to fix the end of game


### Challenges
There were a lot of challenges along the project since it was our first big solo project. There were some problems with the AddEventListener, since I was trying to use it twice for keys pressed, the fix was to call it just once and call the second function into the original one.

### Wins
Finishing my first ever game and project! Even through all the challenge and known bugs, I felt like the biggest win was being able to have a playable game that I could present, deliver and add to my portfolio

## Key learnings
My biggest ‘proud’ moment was once I started to fix some bugs that appeared, by understanding what was happening and debugging it to see where it stemmed from.
This understanding of the code was something that grew with the project and with every bug and fix made.

Also, the structuring of the project. I believe I learnt some lessons on what to do or not with the next one, like the creation and deletion of HTML dynamic elements, it can get tricky sometimes.

## Known errors or bugs
* The aliens’ movement still has a bug that I could not fix, at a certain point they just start to spread out, instead of keeping together.

* The alien shooting isn’t working as intended as well because it will choose one fixed alien and that will be the one that always shoots.

* The play again button also needs refinement since, sometimes, it brings some shots from the previous game to the new one. Also the ‘lives’ don’t refresh.


## Future improvements
* For the play again button bug, I believe that instead of making it run the init() function again it just reloads the page is a way of fixing it.


