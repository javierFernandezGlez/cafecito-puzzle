let moves = 0;
let rows = 3;
let columns = 3;
let bigSquare = document.getElementById("square");
let count = 9;
let currentSquare;
let blankSquare;
let movesText = document.getElementById("moves");

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

function randomPermutation(array) {
    const n = array.length;

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
function displayBoard() {
    const arr = randomSolvablePermutation(order);
    for(let i = 0; i < rows; i++) {
        for(let j = 0; j < columns; j++) {
            let littleSquare = document.createElement("img");
            littleSquare.id = "(" + i + "," + j + ")";
            console.log(littleSquare.id);
            littleSquare.src = "./" + arr.shift() + ".jpg";
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

function dragLeave() {

}

function dragDrop() {
    blankSquare = this;
}

function dragEnd() {

    if(!blankSquare.src.includes("1")) {
        return;
    }
    let currentImage = currentSquare.src;
    let blank = blankSquare.src;

    currentSquare.src = blank;
    blankSquare.src = currentImage;
    moves++;
    movesText.innerHTML = moves;


}
