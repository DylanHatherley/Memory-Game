let cards = [
        'server', 'laptop', 'keyboard', 'memory', 'save', 'hdd', 'desktop', 'microchip',
        'server', 'laptop', 'keyboard', 'memory', 'save', 'hdd', 'desktop', 'microchip'
    ],
    moves,
    matched,
    cardsLeft,
    turnedCards,
    timer,
    startTime,
    endTime,
    timerInterval,
    endScore,
    now;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Setups deck and the score panel for the game
function renderBoard() {
    moves = 0,
        matched = 0,
        timer = false,
        startTime = 0,
        endTime = 0,
        cardsLeft = 16,
        timerInterval,
        now = 0,
        turnedCards = [];
    scorePanel();
    document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + "00:00";
    document.querySelector(".cards-left").innerText = cardsLeft;

    // Listener to reset board by key press
    document.addEventListener('keydown', (e) => {
        if (e.key == "r" || e.key == "R") {
            resetBoard();
        }
    });

    for (let index in shuffle(cards)) {
        let card = document.createElement("li");
        card.setAttribute('class', "card");
        card.innerHTML = "<i class='fa fa-" + cards[index] + "'>";
        document.querySelector(".deck").appendChild(card);

        // Listener for the cards
        card.addEventListener("click", function () {
            cardListener(card, cards[index]);
        });
    }
}

// Resets all actions after last game
function resetBoard() {
    document.querySelector(".deck").innerHTML = "";
    timerStart(false);

    if (document.querySelector(".modal").classList.toggle("show-modal") == true) {
        document.querySelector(".modal").classList.toggle("show-modal");
    }

    renderBoard();
}

// A Listener for the cards
function cardListener(card, cardsIndex) {
    if (!startTime) {
        timerStart(true);
    }
    if (!turnedCards[0]) {
        cardDisplay(card);
        turnedCards[0] = cardsIndex;
    } else if (!turnedCards[1]) {
        turnedCards[1] = cardsIndex;
        if (turnedCards[0] == turnedCards[1]) {
            cardDisplay(card);
            matchCard();
        } else {
            cardDisplay(card);
            setTimeout(noMatchCard, 1000);
        }
    }

}

// Displays the cards back side
function cardDisplay(card) {
    card.setAttribute('class', "card open");
}

// Changes the matched cards to display the match
function matchCard() {
    for (let i = 0; i < document.querySelectorAll(".card.open").length; i) {
        document.querySelectorAll(".card.open")[0].classList.replace("open", "match");
    }

    cardsLeft = cardsLeft - 2;
    document.querySelector(".cards-left").innerText = cardsLeft;
    movesCounter();
    turnedCards = [];
    matched++;

    if (matched == 8) {
        win();
    }
}

// Changes the cards to unturned state
function noMatchCard() {

    for (let i = 0; i < document.querySelectorAll(".card.open").length; i) {
        document.querySelectorAll(".card.open")[0].classList.remove("open");
    }

    movesCounter()
    turnedCards = [];
}

// Counts the moves made in the game
function movesCounter() {
    moves++;
    scorePanel();
}

// sets up timer at the beginning of the game and stops it at the end
function timerStart(timer) {
    if (timer == true) {
        if (!startTime) {
            startTime = Date.now();
        }
        // displays new time each second of the game
        timerInterval = setInterval(function () {
            now = Date.now() - startTime;

            if ((Math.floor(now / 1000) % 60) < 10 && Math.floor(now / (60 * 1000) % 60) < 1) {
                document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + "00:0" + (Math.floor(now / 1000) % 60);
            }

            if ((Math.floor(now / 1000) % 60) > 10 && Math.floor(now / (60 * 1000) % 60) < 1) {
                document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + "00:" + (Math.floor(now / 1000) % 60);
            }

            if (Math.floor(now / (60 * 1000) % 60) > 0) {
                document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + "0" + Math.floor(now / (60 * 1000) % 60) + ":0" + (Math.floor(now / 1000) % 60);
            
                if ((Math.floor(now / 1000) % 60) > 9) {
                    document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + "0" + Math.floor(now / (60 * 1000) % 60) + ":" + (Math.floor(now / 1000) % 60);
                }
            }

            if (Math.floor(now / (60 * 1000) % 60) > 9) {
                document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + Math.floor(now / (60 * 1000) % 60) + ":0" + (Math.floor(now / 1000) % 60);
             
                if ((Math.floor(now / 1000) % 60) > 9) {
                    document.querySelector(".timer").innerHTML = "<i class='fa fa-clock'></i> " + Math.floor(now / (60 * 1000) % 60) + ":" + (Math.floor(now / 1000) % 60);
                }
            }
        }, 1000);
    } else if (timer == false) {
        clearInterval(timerInterval)
        endTime = now;
    }
}

// display the star rating based on the amount of moves made
function scorePanel() {
    document.querySelector(".moves").innerText = moves;

    if (moves < 15) {
        document.querySelector(".stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    }
 
    if (moves > 15) {
        document.querySelector(".stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="far fa-star"></i></li>';
    }

    if (moves > 20) {
        document.querySelector(".stars").innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li>';
    }

    if (moves > 25) {
        document.querySelector(".stars").innerHTML = '<li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li><li><i class="far fa-star"></i></li>';
    }
}

function highScore() {
    if (!localStorage.highScore) {
        localStorage.highScore = endScore;
    }

    if (endScore < localStorage.highScore) {
        localStorage.highScore = endScore;
        document.querySelector(".new-hs").innerText = "New Highscore!"
    }
    document.querySelector(".high-score").innerText = "High Score: " + localStorage.highScore
}

// ends game and displays modal showing the games stats
function win() {
    timerStart(false);
    endScore = endTime + (moves * 500);
    document.querySelector(".modal").classList.toggle("show-modal");
    document.querySelectorAll(".moves")[1].innerText = "Moves: " + document.querySelectorAll(".moves")[0].innerText;
    document.querySelectorAll(".timer")[1].innerText = "Time: " + document.querySelectorAll(".timer")[0].innerText;
    document.querySelector(".end-score").innerText = "Final Score: " + endScore
    highScore();
}


renderBoard();