/*
Author: Alex Kruger

Main JS file for the project. Controls the game rules and the movement
of the blocks.
*/


document.addEventListener('DOMContentLoaded', () => {
    const gridDisplay = document.querySelector('.grid');
    const scoreDisplay = document.getElementById('score');
    const resultDisplay = document.getElementById('result');
    const width = 4;
    let squares = [];
    let score = 0;

    /*
    description: creates the initial game board
    params: none
    returns: none
    */
    function createBoard() {
        for (let i=0; i < width*width; i++) {
            square = document.createElement('div');
            square.innerHTML = 0;
            gridDisplay.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

    createBoard();

    /*
    description: generates a new 2 block on the board
    params: none
    returns: none
    */
    function generate() {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == 0) {
            squares[randomNumber].innerHTML = 2;
            checkForGameOver()
        } else {
            generate();
        }
    }

    /*
    description: moves the blocks right
    params: none
    returns: none
    */
    function moveRight() {
        for (let i=0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [
                    parseInt(totalOne), 
                    parseInt(totalTwo), 
                    parseInt(totalThree), 
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = zeros.concat(filteredRow)

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    /*
    description: moves the blocks left
    params: none
    returns: none
    */
    function moveLeft() {
        for (let i=0; i < width * width; i++) {
            if (i % width === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i+1].innerHTML;
                let totalThree = squares[i+2].innerHTML;
                let totalFour = squares[i+3].innerHTML;
                let row = [
                    parseInt(totalOne), 
                    parseInt(totalTwo), 
                    parseInt(totalThree), 
                    parseInt(totalFour)
                ];

                let filteredRow = row.filter(num => num);
                let missing = width - filteredRow.length;
                let zeros = Array(missing).fill(0);
                let newRow = filteredRow.concat(zeros)

                squares[i].innerHTML = newRow[0];
                squares[i+1].innerHTML = newRow[1];
                squares[i+2].innerHTML = newRow[2];
                squares[i+3].innerHTML = newRow[3];
            }
        }
    }

    /*
    description: moves the blocks down
    params: none
    returns: none
    */
    function moveDown()  {
        for (let i=0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width*2].innerHTML;
            let totalFour = squares[i + width*3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ]

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;

            let zeros = Array(missing).fill(0);
            let newColumn = zeros.concat(filteredColumn)

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]

        }
    }

    /*
    description: moves the blocks up
    params: none
    returns: none
    */
    function moveUp()  {
        for (let i=0; i < width; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + width].innerHTML;
            let totalThree = squares[i + width*2].innerHTML;
            let totalFour = squares[i + width*3].innerHTML;
            let column = [
                parseInt(totalOne),
                parseInt(totalTwo),
                parseInt(totalThree),
                parseInt(totalFour)
            ]

            let filteredColumn = column.filter(num => num);
            let missing = width - filteredColumn.length;

            let zeros = Array(missing).fill(0);
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0];
            squares[i+width].innerHTML = newColumn[1]
            squares[i+width*2].innerHTML = newColumn[2]
            squares[i+width*3].innerHTML = newColumn[3]
        }
    }


    /*
    description: cobines blocks in rows when they move horizontally, 
        then checks if the player has won
    params: none
    returns: none
    */
    function combineRow() {
        for (let i=0; i < width*width - 1; i++) {
            if (squares[i].innerHTML === squares[i+1].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+1].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin()
    }

    /*
    description: cobines blocks in columns when they move vertically, 
        then checks if the player has won
    params: none
    returns: none
    */
    function combineColumn() {
        for (let i=0; i < width*width - width; i++) {
            if (squares[i].innerHTML === squares[i+width].innerHTML) {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i+width].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i+width].innerHTML = 0;

                score += combinedTotal;
                scoreDisplay.innerHTML = score;
            }
        }
        checkForWin()
    }

    /*
    description: reads in the event (a key being pressed) and passes on the
        action to its helper function
    params:
        e : event parameter for when a key is presed
    returns: none
    */
    function control(e) {
        if(e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        } else if (e.keyCode === 78) {
            newGame();
        }
    }
    document.addEventListener('keyup', control);

    /*
    description: controls what happens when the right key is clicked
    params: none
    returns: none
    */
    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    /*
    description: controls what happens when the left key is clicked
    params: none
    returns: none
    */
    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    /*
    description: controls what happens when the down key is clicked
    params: none
    returns: none
    */
    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    /*
    description: controls what happens when the up key is clicked
    params: none
    returns: none
    */
    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    /*
    description: creates a new game by clearing the board, resetting the
        score and generating new starting blocks
    params: none
    returns: none
    */
    function newGame() {
        clearBoard();
        score = 0;
        scoreDisplay.innerHTML = score;
        generate();
        generate();
    }

    /*
    description: checks if the player has won by iterating through each block
        and looking for 2048
    params: none
    returns: none
    */
    function checkForWin() {
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                resultDisplay.innerHTML = "You Win!";
            }
        }
    }

    /*
    description: checks if the player has lost by iterating through each block
        and determining if the board is full
    params: none
    returns: none
    */
    function checkForGameOver() {
        let zeros = 0;
        for (let i=0; i < squares.length; i++) {
            if (squares[i].innerHTML == 0) {
                zeros++;
            }
        }
        if (zeros === 0) {
            resultDisplay.innerHTML = "You Lose!";
        }
    }

    /*
    description: sets the board so that all blocks are back to 0
    params: none
    returns: none
    */
    function clearBoard() {
        for (let i=0; i < width*width; i++) {
            squares[i].innerHTML = 0;
        }
    }

})