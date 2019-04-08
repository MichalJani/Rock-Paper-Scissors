'use strict'

function main() {

    var rockButton = document.getElementById('rock_button');
    var paperButton = document.getElementById('paper_button');
    var scissorsButton = document.getElementById('scissors_button');
    var output = document.getElementById('output');
    var scoreBox = document.getElementById('result');
    var roundsBox = document.getElementById('rounds');
    var newGameButton = document.getElementById('new_game');
    var modalWhoWon = document.getElementById('modal_who_won')
    var gameOverModal = document.getElementById('modal-box');

    var params = {
        playerScore: 0,
        computerScore: 0,
        roundsNumber: 0,
        progress: []
    }
    var turnNotRound = 0;

    var disable = function () {
        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true;
        rockButton.classList.add("button_over");
        paperButton.classList.add("button_over");
        scissorsButton.classList.add("button_over");
    };
    disable();
    var newScore = function () {
        params.playerScore = 0;
        params.computerScore = 0;
        params.progress = [];
        turnNotRound = 0;
        scoreBox.innerHTML = 'your score ' + params.playerScore + ' - ' +
            params.computerScore + ' computer score';
        output.innerHTML = ' ';
    }
    newGameButton.addEventListener('click', function () {
        newScore();
        params.roundsNumber = parseInt(prompt('How many rounds to win the game?'));
        numRounds(params.roundsNumber);
    });
    var numRounds = function () {
        if (params.roundsNumber > 0) {

            rockButton.disabled = false;
            paperButton.disabled = false;
            scissorsButton.disabled = false;
            rockButton.classList.remove("button_over");
            paperButton.classList.remove("button_over");
            scissorsButton.classList.remove("button_over");
            roundsBox.innerHTML = 'You need to win ' + params.roundsNumber +
                ' rounds to win this game' + '<br>';
            return params.roundsNumber;
        } else {
            roundsBox.innerHTML = 'Thats not a number!';
            gameOver();
        }
    }
    var eachButton = document.querySelectorAll('.player-move');

    for (var i = 0; i < eachButton.length; i++) {
        eachButton[i].addEventListener('click', function () {
            var playerMove = this.getAttribute('data-move');
            var whoWon = determineWinner(playerMove);
            printOutput(whoWon);
            printScore();
        });

    };
    var randomNumber = function () {
        var num = Math.floor(Math.random() * 3)
        if (num === 0) {
            return 'rock'
        } else if (num === 1) {
            return 'paper'
        } else if (num === 2) {
            return 'scissors'
        }
    };
    var generateTable = function () {
        var tableTitle = ['Round number', 'Your Move', 'Computer Move', 'Round Score', 'Total Score']
        var table = document.createElement('table');
        table.style.width = '90%';
        table.style.border = '1px solid black';       
        for (var i = 0; i < params.progress.length; i++) {
            var tr = table.insertRow();
            tr.insertCell().appendChild(document.createTextNode(params.progress[i].turnNotRound));
            tr.insertCell().appendChild(document.createTextNode(params.progress[i].playerMove));
            tr.insertCell().appendChild(document.createTextNode(params.progress[i].computerMove));
            tr.insertCell().appendChild(document.createTextNode(params.progress[i].roundScore));
            tr.insertCell().appendChild(document.createTextNode(params.progress[i].sumScore));
        }
        var tableHeader = table.createTHead();
        var theadRow = tableHeader.insertRow();
        for (var k = 0; k < 5; k++) {
            var tdh = theadRow.insertCell();
            tdh.appendChild(document.createTextNode(tableTitle[k]));
        }
        gameOverModal.appendChild(table);
    }

    var TableData = function (turnNotRound, playerChoice, computerChoice, roundScore, playerScore, computerScore) {
        this.turnNotRound = turnNotRound;
        this.playerMove = playerChoice;
        this.computerMove = computerChoice;
        this.roundScore = roundScore;
        this.sumScore = 'player ' + playerScore + ' - ' + computerScore + ' computer';
    }

    var determineWinner = function (playerChoice) {
        var computerChoice = randomNumber();
        turnNotRound++;
        var roundScore;
        var push = function () {
            params.progress.push(new TableData(turnNotRound, playerChoice, computerChoice, roundScore, params.playerScore, params.computerScore));
        }

        if (playerChoice === computerChoice) {
            roundScore = 'player 0 - 0 computer'
            push();
            return 'tie';
        } else if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')) {
            params.playerScore++;
            roundScore = 'player 1 - 0 computer';
            push();
            return 'you won. you played ' + playerChoice +
                ' computer played ' + computerChoice + '.';
        } else if ((playerChoice === 'rock' && computerChoice === 'paper') ||
            (playerChoice === 'paper' && computerChoice === 'scissors') ||
            (playerChoice === 'scissors' && computerChoice === 'rock')) {
            params.computerScore++;
            roundScore = 'player 0 - 1 computer';
            push();
            return 'you lost. you played ' + playerChoice +
                ' computer played ' + computerChoice + '.';
        }
    };

    var printOutput = function (whoWon) {
        output.innerHTML = whoWon;
        return whoWon;
    }
    var gameOver = function () {
        rockButton.disabled = true;
        paperButton.disabled = true;
        scissorsButton.disabled = true;
        rockButton.classList.add("button_over");
        paperButton.classList.add("button_over");
        scissorsButton.classList.add("button_over");
    }


    var printScore = function () {
        scoreBox.innerHTML = 'your score ' + params.playerScore + ' - ' +
            params.computerScore + ' computer score';
        if (params.roundsNumber === 0) {
            return;
        }
        if (params.playerScore === params.roundsNumber) {
            showModalOne();
            modalWhoWon.innerHTML = 'you won!';
            generateTable();
            gameOver();
        } else if (params.computerScore === params.roundsNumber) {
            showModalOne();
            modalWhoWon.innerHTML = 'you lost!';
            generateTable();
            gameOver();
        }
    };


    var showModalOne = function (event) {
        var allModals = document.querySelectorAll('.modal')
        for (var i = 0; i < allModals.length; i++) {
            allModals[i].classList.remove('show'); //usuwa klasę .show ze wszystkich modali
        }
        document.querySelector('#modal-box').classList.add('show'); //dodaje klase .show do modal
        document.querySelector('#modal-overlay').classList.add('show'); //dodaje klasę .show do overlay
    };

    var hideModal = function (event) {
        event.preventDefault();
        tableRemove();
        document.querySelector('#modal-overlay').classList.remove('show');
    };

    var closeButtons = document.querySelector('.modal .close');
    closeButtons.addEventListener('click', hideModal);


    document.querySelector('#modal-overlay').addEventListener('click', hideModal);
    var modals = document.querySelectorAll('.modal');
    for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener('click', function (event) {
            event.stopPropagation();
        });
    };
    var tableRemove = function () {
        var tab = document.querySelector('table');
        gameOverModal.removeChild(tab);
    }

};
main()