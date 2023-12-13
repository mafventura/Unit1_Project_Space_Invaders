// --------------- SPACE INVADERS ----------------

// * Cached Elements
const board = document.getElementById('board')
const title = document.getElementById('title')
const play = document.getElementById('start')
const info = document.getElementById('info')
const score = document.getElementById('score')




// * Variables
const width = 20
const height = 20
const cellCount = width * height
let alienInterval
let shootingInterval
let direction1 = "right"
let direction2 = "right"
let direction3 = "right"

let playerScore = 0


let cells = [] //to be able to keep track of positions
const shipStartingPosition = 370
let shipCurrentPosition = shipStartingPosition
const aliens1StartingPosition= [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
let aliens1CurrentPosition = aliens1StartingPosition
const aliens2StartingPosition  = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
let aliens2CurrentPosition = aliens2StartingPosition
const aliens3StartingPosition = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
let aliens3CurrentPosition = aliens3StartingPosition
const wall1 = [322, 323, 324, 327, 328, 329, 332, 333, 334, 336, 337]
let wallLife = wall1

// * add/remove Classes Fucntions //
function addClass (position, name) {
    cells[position].classList.add(name)
}

function removeClass (position, name) {
    cells[position].classList.remove(name)
}


// * Main Functions
// init()

document.addEventListener('keydown', handleShipMovement)
// document.addEventListener('keyup', shooting)
play.addEventListener('click', init)
// playAgainBtn.addEventListener('click', init)


function init() {
title.remove()
play.remove()
info.remove()
board.style.flexDirection = 'row'
createGrid()
startingPositions()
handleAliensMovement()

}

function createGrid() {
    // grid info

    //create grid cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div') //creating the cell divs
        cell.innerText = i // text for guidance
        cell.setAttribute('id', i) // text for guidance
        board.appendChild(cell) // appending the cells to the board
        cells.push(cell) // adding each cell to the cells array
    }

    score.innerText = `Score: ${playerScore}`

}

function startingPositions() {
    // adding ship to starting position
    addClass(shipStartingPosition, 'ship')

    // adding aliens to starting position
    aliens1StartingPosition.forEach((position) => {
        addClass(position, 'alien1')
    })

    aliens2StartingPosition.forEach((position) => {
        addClass(position, 'alien2')
    })

    aliens3StartingPosition.forEach((position) => {
        addClass(position, 'alien3')
    })

    wall1.forEach((position) => {
        addClass(position, 'wall')
    })
}

//MOVEMENT
// ship's movement

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
    }

    addClass(shipCurrentPosition, 'ship')
    

}

function handleAliensMovement() {
    let alienCount = aliens1CurrentPosition.length + aliens2CurrentPosition.length + aliens3CurrentPosition.length
    let myInterval = 400
    let alienInterval

    alienInterval = setInterval(alien1Timer, myInterval)


    function alien1Timer() {


    
    const lastAlien1Pos = aliens1CurrentPosition[aliens1CurrentPosition.length - 1]
    const firstAlien1Pos = aliens1CurrentPosition[0]
    let newPositions1 = []

    const lastAlien2Pos = aliens2CurrentPosition[aliens2CurrentPosition.length - 1]
    const firstAlien2Pos = aliens2CurrentPosition[0]
    let newPositions2 = []

    const lastAlien3Pos = aliens3CurrentPosition[aliens3CurrentPosition.length - 1]
    const firstAlien3Pos = aliens3CurrentPosition[0]
    let newPositions3 = []
    

    if (lastAlien1Pos % width !== width - 1 && direction1 === "right") {
        newPositions1 = aliens1CurrentPosition.map((pos) => {
        removeClass(pos, 'alien1');
        return pos += 1;
        });
        aliens1CurrentPosition = [...newPositions1];
    } else if (lastAlien1Pos % width === width - 1 && direction1 === "right") {
        newPositions1 = aliens1CurrentPosition.map((pos) => {
        removeClass(pos, 'alien1');
        direction1 = "left";
        return pos += 20;
        });
        aliens1CurrentPosition = [...newPositions1];
    } else if (firstAlien1Pos % width === 0 && direction1 === "left") {
        newPositions1 = aliens1CurrentPosition.map((pos) => {
        removeClass(pos, 'alien1');
        direction1 = "right";
        return pos += 20;
        });
        aliens1CurrentPosition = [...newPositions1];
    } else {
        newPositions1 = aliens1CurrentPosition.map((pos) => {
        removeClass(pos, 'alien1');
        return pos -= 1;
        });
        aliens1CurrentPosition = [...newPositions1];
    }

    if (lastAlien2Pos % width !== width - 1 && direction2 === "right") {
        newPositions2 = aliens2CurrentPosition.map((pos) => {
        removeClass(pos, 'alien2');
        return pos += 1;
        });
        aliens2CurrentPosition = [...newPositions2];
    } else if (lastAlien2Pos % width === width - 1 && direction2 === "right") {
        newPositions2 = aliens2CurrentPosition.map((pos) => {
        removeClass(pos, 'alien2');
        direction2 = "left";
        return pos += 20;
        });
        aliens2CurrentPosition = [...newPositions2];
    } else if (firstAlien2Pos % width === 0 && direction2 === "left") {
        newPositions2 = aliens2CurrentPosition.map((pos) => {
        removeClass(pos, 'alien2');
        direction2 = "right";
        return pos += 20;
        });
        aliens2CurrentPosition = [...newPositions2];
    } else {
        newPositions2 = aliens2CurrentPosition.map((pos) => {
        removeClass(pos, 'alien2');
        return pos -= 1;
        });
        aliens2CurrentPosition = [...newPositions2];
    }

    if (lastAlien3Pos % width !== width - 1 && direction3 === "right") {
        newPositions3 = aliens3CurrentPosition.map((pos) => {
        removeClass(pos, 'alien3');
        return pos += 1;
        });
        aliens3CurrentPosition = [...newPositions3];
    } else if (lastAlien3Pos % width === width - 1 && direction3 === "right") {
        newPositions3 = aliens3CurrentPosition.map((pos) => {
        removeClass(pos, 'alien3');
        direction3 = "left";
        return pos += 20;
        });
        aliens3CurrentPosition = [...newPositions3];
    } else if (firstAlien3Pos % width === 0 && direction3 === "left") {
        newPositions3 = aliens3CurrentPosition.map((pos) => {
        removeClass(pos, 'alien3');
        direction3 = "right";
        return pos += 20;
        });
        aliens3CurrentPosition = [...newPositions3];
    } else {
        newPositions3 = aliens3CurrentPosition.map((pos) => {
        removeClass(pos, 'alien3');
        return pos -= 1;
        });
        aliens3CurrentPosition = [...newPositions3];
    }

    aliens1CurrentPosition.forEach(position => addClass(position, 'alien1'));
    aliens2CurrentPosition.forEach(position => addClass(position, 'alien2'));
    aliens3CurrentPosition.forEach(position => addClass(position, 'alien3'));
    
    if (lastAlien3Pos > 359 || lastAlien2Pos > 359 || lastAlien1Pos > 359) {
        clearInterval(alienInterval)
        endGame()
    }

    }


    }



function shooting(evt) {

    let shootingPosition = shipCurrentPosition - 20

    addClass(shootingPosition, 'shoot')

    const shootingInterval = setInterval(shootingTimer, 250)

    function shootingTimer () {
        removeClass(shootingPosition, 'shoot')
        shootingPosition -= 20 
        addClass(shootingPosition, 'shoot')

        const topLine = Math.floor(shootingPosition / width) 

        if (topLine === 0) {
            removeClass(shootingPosition, 'shoot')
            clearInterval(shootingInterval)

        }  else if (cells[shootingPosition].classList.contains('alien1')) {
            const alienIndex = aliens1CurrentPosition.indexOf(shootingPosition)
            aliens1CurrentPosition.splice(alienIndex, 1)
        
            removeClass(shootingPosition, 'alien1')
            removeClass(shootingPosition, 'shoot')
            playerScore += 30
            clearInterval(shootingInterval)
            return playerScore
        } else if (cells[shootingPosition].classList.contains('alien2')) {
            const alienIndex = aliens2CurrentPosition.indexOf(shootingPosition)
            aliens2CurrentPosition.splice(alienIndex, 1)
        
            removeClass(shootingPosition, 'alien2')
            removeClass(shootingPosition, 'shoot')
            playerScore += 20
            clearInterval(shootingInterval)
            return playerScore
        } else if (cells[shootingPosition].classList.contains('alien3')) {
            const alienIndex = aliens3CurrentPosition.indexOf(shootingPosition)
            aliens3CurrentPosition.splice(alienIndex, 1)
        
            removeClass(shootingPosition, 'alien3')
            removeClass(shootingPosition, 'shoot')
            playerScore +=10
            clearInterval(shootingInterval)
            return playerScore
        } else if (cells[shootingPosition].classList.contains('wall')) {
            const wall1Index = wall1.indexOf(shootingPosition)
            wall1.splice(wall1Index, 1)
        
            removeClass(shootingPosition, 'wall')
            removeClass(shootingPosition, 'shoot')
            
            clearInterval(shootingInterval)
            return playerScore
        }

}

}

function endGame () {
    cells.map((cell) => {
        cell.remove()
    })
    let endScreen = document.createElement('h1')
    endScreen.innerText = 'You Lose'
    endScreen.classList.add('endgame')
    let playAgainBtn = document.createElement('button')
    playAgainBtn.innerText = 'Play Again?'
    endScreen.classList.add('playagain')
    board.appendChild(endScreen)
    board.appendChild(playAgainBtn)
    board.style.flexDirection = 'column'
}