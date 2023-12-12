// --------------- SPACE INVADERS ----------------

// * Cached Elements
const board = document.getElementById('board')
const title = document.getElementById('title')
const play = document.getElementById('start')



// * Variables
const width = 20
const height = 20
const cellCount = width * height
let alienInterval
let shootinInterval
let direction1 = "right"
let direction2 = "right"
let direction3 = "right"
let playerScore = 0


let cells = [] //to be able to keep track of positions
const shipStartingPosition = 370
let shipCurrentPosition = shipStartingPosition
const aliens1StartingPosition = [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35]
let aliens1CurrentPosition = aliens1StartingPosition
const aliens2StartingPosition = [44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75]
let aliens2CurrentPosition = aliens2StartingPosition
const aliens3StartingPosition = [84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115]
let aliens3CurrentPosition = aliens3StartingPosition

// * add/remove Classes Fucntions //
function addClass (position, name) {
    cells[position].classList.add(name)
}

function removeClass (position, name) {
    cells[position].classList.remove(name)
}


// * Main Functions
init()

document.addEventListener('keydown', handleShipMovement)
document.addEventListener('keyup', shooting)
play.addEventListener('click', init)


function init() {
// title.remove()
// play.remove()
createGrid()
startingPositions()
handleAliensMovement()


}

function createGrid() {
    // grid info

    //create grid cells
    for (let i = 0; i < cellCount; i++) {
        const cell = document.createElement('div') //creating the cell divs
        // cell.innerText = i // text for guidance
        cell.dataset.index = i // text for guidance
        board.appendChild(cell) // appending the cells to the board
        cells.push(cell) // adding each cell to the cells array
    }
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
    } 

    addClass(shipCurrentPosition, 'ship')
    

}

function handleAliensMovement() {
    let alienCount = aliens1CurrentPosition.length + aliens2CurrentPosition.length + aliens3CurrentPosition

    alienInterval = setInterval(alien1Timer, 1000)

    // if (alienCount > (alienCount/2)) {
    //     alienInterval = setInterval(alien1Timer, 1000)
    // } else if (alienCount) {

    // }

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
    
    }   


    }



function shooting(event) {

    const key = event.key
    const spacebar = " "

    let shootingPosition = shipCurrentPosition - 20

    if (key === spacebar) {
        addClass(shootingPosition, 'shoot')
    }

    shootingInterval = setInterval(shootingTimer, 250)

    function shootingTimer () {
        removeClass(shootingPosition, 'shoot')
        shootingPosition -= 20
        addClass(shootingPosition, 'shoot')

        let arr = []

        aliens1CurrentPosition.map(position => { 
            arr.push(position)
        })


        if(arr.includes(shootingPosition)) {
            console.log(shootingPosition);
            arr.splice(shootingPosition, 1)
            removeClass(shootingPosition, 'alien1')

            
        } else if (shootingPosition < 19 && shootingPosition > 0) {
            clearInterval(shootinInterval)
        }

    }

}


