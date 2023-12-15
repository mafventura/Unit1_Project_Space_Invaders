// --------------- SPACE INVADERS ----------------

// * Cached Elements
const board = document.getElementById('board')
const title = document.getElementById('title')
const play = document.getElementById('start')
const info = document.getElementById('info')
const score = document.getElementById('score')
const live1 = document.getElementById('live1')
const live2 = document.getElementById('live2')
const live3 = document.getElementById('live3')




// * Global Variables
const width = 20
const height = 20
const cellCount = width * height
let alienInterval
let shootingInterval
let laserInterval
let direction1 = "right"
let direction2 = "right"
let direction3 = "right"
let lives
let shootingPosition
let laserPos
let playerScore
let cells 
let shipStartingPosition
let shipCurrentPosition = shipStartingPosition
let aliens1StartingPosition
let aliens1CurrentPosition = aliens1StartingPosition
let aliens2StartingPosition
let aliens2CurrentPosition = aliens2StartingPosition
let aliens3StartingPosition
let aliens3CurrentPosition = aliens3StartingPosition
let wall
let wallLife = wall
let randNumm = Math.floor(Math.random() * 6)
const shootSounds= new Audio("img/sounds/laser-104024.mp3")
const crashSound= new Audio("img/sounds/small-explosion-103779.mp3")
shootSounds.volume = 0.2;
crashSound.volume = 0.2;


// * add/remove Classes Fucntions //
function addClass(position, name) {
    cells[position].classList.add(name)
}

function removeClass(position, name) {
    cells[position].classList.remove(name)
}


// * Main Functions
// init()

document.addEventListener('keydown', handleShipMovement, false)
play.addEventListener('click', init)



function init() {
    title.remove()
    play.remove()
    info.remove()
    clearInterval(laserInterval)
    clearInterval(alienInterval)
    clearInterval(shootingInterval)
    board.innerHTML = ''
    board.style.flexDirection = 'row'
    cells = []
    shipStartingPosition = 370
    shipCurrentPosition = shipStartingPosition
    aliens1StartingPosition = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
    aliens1CurrentPosition = aliens1StartingPosition
    aliens2StartingPosition = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
    aliens2CurrentPosition = aliens2StartingPosition
    aliens3StartingPosition = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
    aliens3CurrentPosition = aliens3StartingPosition
    wall = [322, 323, 324, 327, 328, 329, 332, 333, 334, 336, 337]
    lives = 3
    playerScore = 0
    shootingPosition = 0
    laserPos = 0
    createGrid()
    startingPositions()
    handleAliensMovement()
    handleLasers()
}

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

    wall.forEach((position) => {
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
        shootSounds.play()
    }

    addClass(shipCurrentPosition, 'ship')

}

function handleAliensMovement() {
    let myInterval = 500
    let alienInterval

    alienInterval = setInterval(alien1Timer, myInterval)

    function alien1Timer() {
    
        let alienCount = aliens1CurrentPosition.length + aliens2CurrentPosition.length + aliens3CurrentPosition.length

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


        if (alienCount <= 0) {
            clearInterval(alienInterval)
            winGame()
        }

        if (lastAlien3Pos > 359 || lastAlien2Pos > 359 || lastAlien1Pos > 359) {
            clearInterval(alienInterval)
            endGame()
        }

        if (lives === 0) {
            clearInterval(alienInterval)
            endGame()

        }
    }


}



function shooting(evt) {

    let shootingPosition = shipCurrentPosition - 20

    addClass(shootingPosition, 'shoot')

    const shootingInterval = setInterval(shootingTimer, 250)

    function shootingTimer() {
        removeClass(shootingPosition, 'shoot')
        shootingPosition -= 20
        addClass(shootingPosition, 'shoot')

        const topLine = Math.floor(shootingPosition / width)

        if (topLine === 0) {
            removeClass(shootingPosition, 'shoot')
            clearInterval(shootingInterval)

        } else if (cells[shootingPosition].classList.contains('alien1')) {
            const alienIndex = aliens1CurrentPosition.indexOf(shootingPosition)
            aliens1CurrentPosition.splice(alienIndex, 1)

            removeClass(shootingPosition, 'alien1')
            removeClass(shootingPosition, 'shoot')
            playerScore += 30
            clearInterval(shootingInterval)
            score.innerText = `Score: ${playerScore}`
            return playerScore
        } else if (cells[shootingPosition].classList.contains('alien2')) {
            const alienIndex = aliens2CurrentPosition.indexOf(shootingPosition)
            aliens2CurrentPosition.splice(alienIndex, 1)

            removeClass(shootingPosition, 'alien2')
            removeClass(shootingPosition, 'shoot')
            playerScore += 20
            clearInterval(shootingInterval)
            score.innerText = `Score: ${playerScore}`
            return playerScore
        } else if (cells[shootingPosition].classList.contains('alien3')) {
            const alienIndex = aliens3CurrentPosition.indexOf(shootingPosition)
            aliens3CurrentPosition.splice(alienIndex, 1)

            removeClass(shootingPosition, 'alien3')
            removeClass(shootingPosition, 'shoot')
            playerScore += 10
            clearInterval(shootingInterval)
            score.innerText = `Score: ${playerScore}`
            return playerScore
        } else if (cells[shootingPosition].classList.contains('wall')) {
            crashSound.play()
            const wallIndex = wall.indexOf(shootingPosition)
            wall.splice(wallIndex, 1)
            removeClass(shootingPosition, 'wall')
            removeClass(shootingPosition, 'shoot')

            clearInterval(shootingInterval)
            return playerScore
        }


    }

    
}

function handleLasers() {
    let alienCount = aliens1CurrentPosition.length + aliens2CurrentPosition.length + aliens3CurrentPosition.length
    randomIndex = Math.floor(Math.random() * 6)
    laserPos = aliens3CurrentPosition[randomIndex]
    setInterval(() => {
        laserPos = aliens3CurrentPosition[randNumm] + 20
        if (alienCount > 1) {
            alienLaser(laserPos)
        }
    }, 1000)
}

function alienLaser(pos) {
    let alienCount = aliens1CurrentPosition.length + aliens2CurrentPosition.length + aliens3CurrentPosition.length

    const lastAlien1Pos = aliens1CurrentPosition[aliens1CurrentPosition.length - 1]

    const lastAlien2Pos = aliens2CurrentPosition[aliens2CurrentPosition.length - 1]

    const lastAlien3Pos = aliens3CurrentPosition[aliens3CurrentPosition.length - 1]

    const laserInterval = setInterval(() => {
        laserPos = cells[pos]

        if (laserPos && laserPos.classList.contains('shoot')) {
            clearInterval(laserInterval)
            removeClass(pos, 'laser')
        } else if (laserPos && laserPos.classList.contains('ship') && lives === 3) {
            clearInterval(laserInterval)
            crashSound.play()
            removeClass(pos, 'laser')
            lives -= 1
            live3.remove()
        } else if (laserPos && laserPos.classList.contains('ship') && lives === 2) {
            clearInterval(laserInterval)
            crashSound.play()
            removeClass(pos, 'laser')
            lives -= 1
            live2.remove()
        } else if (laserPos && laserPos.classList.contains('ship') && lives === 1) {
            clearInterval(laserInterval)
            crashSound.play()
            removeClass(pos, 'laser')
            lives -= 1
            live1.remove()
        } else if (lives === 0) {
            clearInterval(laserInterval)
            removeClass(pos, 'ship')
            removeClass(pos, 'laser')
        } else if (laserPos && laserPos.classList.contains('wall')) {
            clearInterval(laserInterval)
            crashSound.play()
            const wallIndex = wall.indexOf(pos)
            wall.splice(wallIndex, 1)
            removeClass(pos, 'wall')
            removeClass(pos, 'laser')
        } else if (pos > 381) {
            clearInterval(laserInterval)
            removeClass(pos, 'laser')
        } else if (alienCount <= 0) {
            clearInterval(laserInterval)
            removeClass(pos, 'laser')
        } else if (lastAlien3Pos > 359 || lastAlien2Pos > 359 || lastAlien1Pos > 359) {
            clearInterval(laserInterval)
            removeClass(pos, 'laser')
        } else {
            removeClass(pos, 'laser')
            pos += height
            addClass(pos, 'laser')
        }

    }, 300)
}

function endGame() {
    board.innerHTML = ''
    let endScreen = document.createElement('h1')
    endScreen.innerText = 'You Lose'
    endScreen.classList.add('endgame')
    let score = document.createElement('h2')
    score.innerText = `Score: ${playerScore}`
    score.classList.add('score')
    let playAgainBtn = document.createElement('button')
    playAgainBtn.innerText = 'Play Again?'
    playAgainBtn.classList.add('playagain')
    board.appendChild(endScreen)
    board.appendChild(score)
    board.appendChild(playAgainBtn)
    board.style.flexDirection = 'column'
    playAgainBtn.addEventListener('click', init)
}

function winGame() {
    board.innerHTML = ''
    let endScreen = document.createElement('h1')
    endScreen.innerText = 'You Win!'
    endScreen.classList.add('endgame')
    let score = document.createElement('h2')
    score.innerText = `Score: ${playerScore}`
    score.classList.add('score')
    let playAgainBtn = document.createElement('button')
    playAgainBtn.innerText = 'Play Again?'
    playAgainBtn.classList.add('playagain')
    board.appendChild(endScreen)
    board.appendChild(score)
    board.appendChild(playAgainBtn)
    board.style.flexDirection = 'column'
    playAgainBtn.addEventListener('click', init)
}