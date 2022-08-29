let movesArray = [];
let moves = 0;
let rows = 3;
let columns = 3;
let bigSquare = document.getElementById("square");
let count = 0;
let currentSquare;
let blankSquare;
let movesText = document.getElementById("moves");
let body = document.getElementsByTagName("body")[0];
let order = [9,8,7,6,5,4,3,2,1];

function numberOfInversions(array) {
    const n = array.length;
    let num = 0;

    for(let i = 0; i < n - 1; i++) {
        for(let j = i + 1; j < n; j++) {
            if(array[i] < array[j]) {
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
console.log(permutation);
function displayBoard() {
    
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            let littleSquare = document.createElement("img");
            littleSquare.id = "(" + i + "," + j + ")";
            console.log(littleSquare.id);
            littleSquare.src = "./" + permutation[count] + ".jpg";
            count++;
            bigSquare.appendChild(littleSquare);
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

function dragEnd() {

    if(!blankSquare.src.includes("1")) {
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
    console.log(permutation);
    console.log(order);
    console.log(equalArrays(permutation, order));
    if(equalArrays(permutation, order)) {
        const movesH = document.getElementById("moves-h");
        movesH.innerHTML = "Congratulations! You have completed the puzzle in " + moves + " moves.";
        movesText.innerHTML = "";
        //shuffle.style.display = "none";
        gameFinished.style.display = "flex";
        gameFinished.style.justifyContent = "center";
        movesArray.push(moves); 
    }
    console.log(permutation);
    console.log(movesArray);
}
const playAgain = document.getElementById("play-again");
const gameFinished = document.getElementById("game-finished");
const shuffle = document.getElementById("shuffle");


playAgain.addEventListener("click", function() {
    location.reload();
})

/*shuffle.addEventListener("click", function() {
    const newPermutation = randomSolvablePermutation(order);
    const n = newPermutation.length;
    for(let i = 0; i < n; i++) {
        permutation[i] = newPermutation[i];
    }
    removeElement("square");
    const newSquare = document.createElement("div");
    bigSquare = newSquare;
    body.appendChild(bigSquare);
    count = 0;
    displayBoard();
})*/

function removeElement(id) {
    let elem = document.getElementById(id);
    return elem.parentNode.removeChild(elem);
}


