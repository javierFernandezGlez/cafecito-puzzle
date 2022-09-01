let movesArray = [];
let moves = 0;
let rows = 3;
let columns = 3;
let bigSquare = document.getElementById("square");
let count = 0;
let currentSquare; 
let movesText = document.getElementById("moves");
let body = document.getElementsByTagName("body")[0];
let order = [1,2,3,4,5,6,7,8,0];
let seen = new Set();

/*function numberOfInversions(matrix) {
    let num = 0;

    for(let i = 0; i < 2; i++) {
        for(let j = i + 1; j < 3; j++) {
            if(matrix[j][i] > 0 && matrix[j][i] > matrix[i][j]) {
                num++;
            }
        }
    }
    return num;
}*/

function numberOfInversions(array) {
    let num = 0;

    for(let i = 0; i < 9; i++) {
        for(let j = i + 1; j < 9; j++) {
            if(array[i] > 0 && array[j] > array[i]) {
                num++;
            }
        }
    }
    return num;
}

function randomPermutation(arr) {
    const n = arr.length;
    let array = [...arr];
    for(let i = n - 1; i >= 1; i--) {
        const j = Math.floor(Math.random()*(i+1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function solvable(array) {
    const invs = numberOfInversions(array);
    return invs % 2 === 0;
}

function randomSolvablePermutation(array) {
    while(true) {
        const arr = randomPermutation(array);
        if(solvable(arr)) {
            return arr;
        }
    }
    return;
}

function adjacent(element1, element2) {
    const x1 = element1[0];
    const y1 = element1[1];
    const x2 = element2[0];
    const y2 = element2[1];

    const adjacentSameRow = x1 === x2 && Math.abs(y2-y1) === 1
    const adjacentSameColumn = y1 === y2 && Math.abs(x1-x2) === 1;

    return adjacentSameColumn || adjacentSameRow;
}

function equalArrays(arr1, arr2) {
    let n = arr1.length;

    for(let i = 0; i < n; i++) {
        if(arr1[i] !== arr2[i]) {
            return false;
        }
    }
    return true;
}

let permutation = randomSolvablePermutation(order);
let initialState = [...permutation];
//let firstNode = new Node(getMatrix(permutation), null);
console.log(permutation);
function displayBoard() {
    bigSquare.innerHTML = "";
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            let littleSquare = document.createElement("img");
            littleSquare.id = "(" + i + "," + j + ")";
            console.log(littleSquare.id);
            littleSquare.src = "./" + permutation[count] + ".jpg";
            bigSquare.appendChild(littleSquare);
            count++;
            littleSquare.addEventListener("dragstart", dragStart);
            littleSquare.addEventListener("dragover", dragOver);
            littleSquare.addEventListener("dragenter", dragEnter);
            littleSquare.addEventListener("dragleave", dragLeave);
            littleSquare.addEventListener("drop", dragDrop);
            littleSquare.addEventListener("dragend", dragEnd);
        }
    }
}

displayBoard();

let blankSquare;

function dragStart() {
    currentSquare = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave(e) {
    e.preventDefault()
}

function dragDrop(e) {
    e.preventDefault();
    blankSquare = this;
}
function move() {
    if(!blankSquare) {
        blankSquare = getBlankSquare();
    }
    if(!blankSquare.src.includes("0")) {
        return;
    }
    let currentX = parseInt(currentSquare.id[1]);
    let currentY = parseInt(currentSquare.id[3]);
    let blankX = parseInt(blankSquare.id[1]);
    let blankY = parseInt(blankSquare.id[3]);
    //console.log(currentX);
    //console.log(currentY);
    //console.log(blankX);
    //console.log(blankY);

    const e1 = [currentX, currentY];
    const e2 = [blankX, blankY];
    if(adjacent(e1, e2)) {
        let currentImage = currentSquare.src;
        let blank = blankSquare.src;
        console.log(currentImage)
        const num1 = parseInt(currentImage[currentImage.length - 5]);
        const num2 = parseInt(blank[blank.length - 5]);
        console.log(num1)
        const index1 = permutation.indexOf(num1);
        const index2 = permutation.indexOf(num2);
        currentSquare.src = blank;
        blankSquare.src = currentImage;
        moves++;
        movesText.innerHTML = moves;
        const temp = permutation[index1];
        permutation[index1] = permutation[index2];
        permutation[index2] = temp;
    }
    if(equalArrays(permutation, order)) {
        const movesH = document.getElementById("moves-h");
        movesH.innerHTML = "Congratulations! You have completed the puzzle in " + moves + " moves.";
        movesText.innerHTML = "";
        shuffle.style.display = "none";
        gameFinished.style.display = "flex";
        gameFinished.style.justifyContent = "center";
        movesArray.push(moves); 
        solve.style.display = "none";
        startAgain.style.display = "none";
    }
    console.log(permutation);
    console.log(seen);
}
function dragEnd() {
    move();
}
const startAgain = document.getElementById("start-again");
const playAgain = document.getElementById("play-again");
const gameFinished = document.getElementById("game-finished");
const shuffle = document.getElementById("shuffle");


playAgain.addEventListener("click", function() {
    location.reload();
})

startAgain.addEventListener("click", function() {
    for(let i = 0; i < 9; i++) {
        permutation[i] = initialState[i];
    }
    count = 0;
    moves = 0;
    movesText.innerHTML = moves;
    displayBoard();
    blankSquare = getBlankSquare();
})

shuffle.addEventListener("click", function() {
    const newPermutation = randomSolvablePermutation(order);
    const n = newPermutation.length;
    for(let i = 0; i < n; i++) {
        permutation[i] = newPermutation[i];
    }
    count = 0;
    displayBoard();
    blankSquare = getBlankSquare();
})

function removeElement(id) {
    let elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}
const images = document.getElementsByTagName("img");
const showNumbers = document.getElementById("show-numbers");

/*showNumbers.addEventListener("click", function() {

    for(let image of images) {
        let num = image.src[image.src.length - 5];
        image.innerHTML = num;
    }
})*/
function getBlankSquare() {
    for(let image of images) {
        if(image.src.includes("0")) {
            return image;
        }
    }
}

console.log(getBlankSquare());

function getRightSquare() {
    const blank = getBlankSquare()
    const x = parseInt(blank.id[1]);
    const y = parseInt(blank.id[3]);
    const isRightEdge = y === columns - 1;
    if (isRightEdge) {
        return null
    }
    let rightId = "(" + x + "," + (y+1) + ")";
    for(let image of images) {
        if(image.id === rightId) {
            return image;
        }
    }
}

function getLeftSquare() {
    const blank = getBlankSquare()
    const x = parseInt(blank.id[1]);
    const y = parseInt(blank.id[3]);
    const isLeftEdge = y === 0;
    if (isLeftEdge) {
        return null
    }
    let leftId = "(" + x + "," + (y-1) + ")";
    for(let image of images) {
        if(image.id === leftId) {
            return image;
        }
    }
}

function getUpSquare() {
    const blank = getBlankSquare()
    const x = parseInt(blank.id[1]);
    const y = parseInt(blank.id[3]);
    const isUpEdge = x === 0;
    if (isUpEdge) {
        return null
    }

    let upId = "(" + (x-1) + "," + y + ")";

    for(let image of images) {
        if(image.id === upId) {
            return image;
        }
    }
}

function getDownSquare() {
    const blank = getBlankSquare()
    const x = parseInt(blank.id[1]);
    const y = parseInt(blank.id[3]);
    const isDownEdge = x === rows - 1;
    if (isDownEdge) {
        return null
    }

    let downId = "(" + (x+1) + "," + y + ")";

    for(let image of images) {
        if(image.id === downId) {
            return image;
        }
    }
}

function handleKeyDown(e) {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft()
            break
        case "ArrowRight":
            moveRight()
            break
        case "ArrowUp":
            moveUp()
            break
        case "ArrowDown":
            moveDown()
            break
    }
}
document.addEventListener("keydown", handleKeyDown);
function moveLeft() {
    const rightSquare = getRightSquare();
    if (rightSquare) {
        currentSquare = rightSquare;
        move();
        blankSquare = getBlankSquare();
    }
}
function moveRight() {
    const leftSquare = getLeftSquare()
    if (leftSquare) {
        currentSquare = leftSquare;
        move();
        blankSquare = getBlankSquare();
    }
}
function moveUp() {
    const belowSquare = getDownSquare()
    if (belowSquare) {
        currentSquare = belowSquare;
        move();
        blankSquare = getBlankSquare();
    }
}
function moveDown() {
    const aboveSquare = getUpSquare()
    if (aboveSquare) {
        currentSquare = aboveSquare;
        move();
        blankSquare = getBlankSquare();
    }
}

function getMatrix(array) {
    let matrix = [];
    let index = 0;
    for(let r = 0; r < rows; r++) {
        matrix[r] = [];
        for(let c = 0; c < columns; c++) {
            matrix[r].push(array[index]);
            index++;
        }
    }
    return matrix;
}

function getArray(matrix) {
    let array = [];

    for(let r = 0; r < rows; r++) {
        for(let c = 0; c < columns; c++) {
            array.push(matrix[r][c]);
        }
    }
    return array;
}

function swap(matrix, row1, column1, row2, column2) {
    let temp = matrix[row1][column1];
    matrix[row1][column1] = matrix[row2][column2];
    matrix[row2][column2] = temp;
}

function isInSet(array, set) {
    let n = array.length;
    for(let s of set) {
        let flag = true;
        for(let i = 0; i < n; i++) {
            if(s[i] !== array[i]) {
                flag = false;
                break;
            }
        }
        if(flag) {
            return true;
        }
    }
    return false;
}

function getBlankPosition(state) {
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            if(state[i][j] === 0) {
                return [i,j];
            }
        }
    }
}

function getChilds(state, seen) {
    let childs = [];
    let blank = getBlankPosition(state);
    let blankX = blank[0];
    let blankY = blank[1];
    const isDownEdge = blankX === rows - 1;
    const isLeftEdge = blankY === 0;
    const isRightEdge = blankY === columns - 1;
    const isUpEdge = blankX === 0;

    if(!isDownEdge) {
        let copy = JSON.parse(JSON.stringify(state));
        swap(copy, blankX, blankY, blankX + 1, blankY);
        if(!seen.has(String(getArray(copy)))) {
            childs.push(copy);
        }
    }

    if(!isLeftEdge) {
        let copy1 = JSON.parse(JSON.stringify(state));
        swap(copy1, blankX, blankY, blankX, blankY - 1);
        if(!seen.has(String(getArray(copy1)))) {
            childs.push(copy1);
        }
    }

    if(!isRightEdge) {
        let copy2 = JSON.parse(JSON.stringify(state));
        swap(copy2, blankX, blankY, blankX, blankY + 1);
        if(!seen.has(String(getArray(copy2)))) {
            childs.push(copy2);
        }
    }

    if(!isUpEdge) {
        let copy3 = JSON.parse(JSON.stringify(state));
        swap(copy3, blankX, blankY, blankX - 1, blankY);
        if(!seen.has(String(getArray(copy3)))) {
            childs.push(copy3);
        }
    }
    return childs;
}
let goal = getMatrix(order);
console.log(goal);
console.log(getChilds(goal, new Set()));
//console.log(getChilds(goal, new Set()));

class Node {
    constructor(state, cameFrom) {
        this.state = state;
        this.cameFrom = cameFrom;
        if(cameFrom) {
            this.g = this.cameFrom.g + 1;
        }
        else {
            this.g = 0;
        }
        this.h = this.manhattanDistance();
        this.score = this.h + this.g;
    }

    manhattanDistance() {
        let distance = 0;
        const matrix = this.state;
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                const value = matrix[i][j];
                if(value !== 0) {
                    const goalX = Math.floor((value - 1)/3);
                    const goalY = (value - 1) % 3;
                    const dx = i - goalX;
                    const dy = j - goalY;
                    distance += Math.abs(dx) + Math.abs(dy);
                }
            }
        }
        return distance;
    }


    path() {
        let node = this;
        let currentPath = [];

        while(node !== null) {
            currentPath.unshift(node.state);
            node = node.cameFrom;
        }
        return currentPath;
    }

    solve() {
        let count = 1;
        let queue = [this];
        seen.add(String(getArray(queue[0].state)));
        while(queue.length > 0) {
            count++;
            if(count === 50000) {
                return "KILLED";
            }
            queue.sort((a,b) => a.score - b.score);
            let currentNode = queue.shift();
            if(String(getArray(currentNode.state)) === String(order)) {
                console.log("YES");
                let path = currentNode.path();
                return path;
            }
            for(let child of getChilds(currentNode.state, seen)) {
                let childNode = new Node(child, currentNode);
                queue.push(childNode);
                seen.add(String(getArray(child)));
            }
        } 
    }
}

let start = new Node(getMatrix(permutation), null);
console.log('value of start node', start);
const solve = document.getElementById("solve");
console.log("Distance: ", start.manhattanDistance())
solve.addEventListener("click", function() {
    //console.log(start.solve());
    displaySolution();
})
function politeDelay(milliseconds){
    return new Promise(resolve => {
        setTimeout(() => resolve(), milliseconds)
    });
}
async function displaySolution() {
    console.log('value of start node in display solution', start, start.solve)
    let pathOfNodes = start.solve();
    const states = [];

    for(let node of pathOfNodes) {
        states.push(getArray(node));
    }
    console.log('result of calling start.solve', pathOfNodes);
    
    let movesSolution = moves - 1;
    for await (let state of states) {
        console.log('politely waiting 1/2 second')
        await politeDelay(500)
        let count2 = 0;
        console.log(state);
        bigSquare.innerHTML = "";
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let littleSquare = document.createElement("img");
                littleSquare.id = "(" + i + "," + j + ")";
                console.log(littleSquare.id);
                console.log(count2)
                littleSquare.src = "./" + state[count2] + ".jpg";
                bigSquare.appendChild(littleSquare);
                count2++;
            }
        }
        movesSolution++;
        movesText.innerHTML = movesSolution;
    }
    const movesH = document.getElementById("moves-h");
    movesH.innerHTML = "The computer has completed the puzzle in " + movesSolution + " moves.";
    movesText.innerHTML = "";
    solve.style.display = "none";
    shuffle.style.display = "none";
    gameFinished.style.display = "flex";
    gameFinished.style.justifyContent = "center";
    startAgain.style.display = "none";
    movesArray.push(moves);
    solve2.style.display = "none";
}

const solve2 = document.getElementById("solve2");
const moves2 = document.getElementById("moves2");
const movesAfter = document.getElementById("moves-after");
solve2.addEventListener("click", function() {
    //console.log(start.solve());
    displaySolutionAfter();
})

async function displaySolutionAfter() {
    gameFinished.style.display = "none";
    movesAfter.style.display = "block";
    console.log('value of start node in display solution', start, start.solve)
    let pathOfNodes = start.solve();
    const states = [];

    for(let node of pathOfNodes) {
        states.push(getArray(node));
    }
    console.log('result of calling start.solve', pathOfNodes);
    
    let newMoves = -1;
    for await (let state of states) {
        console.log('politely waiting 1/2 second')
        await politeDelay(500)
        let count2 = 0;
        console.log(state);
        bigSquare.innerHTML = "";
        for(let i = 0; i < rows; i++) {
            for(let j = 0; j < columns; j++) {
                let littleSquare = document.createElement("img");
                littleSquare.id = "(" + i + "," + j + ")";
                console.log(littleSquare.id);
                console.log(count2)
                littleSquare.src = "./" + state[count2] + ".jpg";
                bigSquare.appendChild(littleSquare);
                count2++;
            }
        }
        newMoves++;
        moves2.innerHTML = newMoves;
    }
    
    movesAfter.innerHTML = "The computer has completed the puzzle in " + newMoves + " moves.";
    movesText.innerHTML = "";
    solve.style.display = "none";
    shuffle.style.display = "none";
    gameFinished.style.display = "flex";
    gameFinished.style.justifyContent = "center";
    startAgain.style.display = "none";
    solve2.style.display = "none";
}



