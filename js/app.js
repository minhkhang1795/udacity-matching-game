/**
 * Create a list that holds all of your cards
 */
let deck = document.getElementById("deck");
let cards = document.getElementsByClassName("card");
let moveElement = document.getElementById("moves");
let vMoveElement = document.getElementById("v-moves");
let starsList = document.getElementsByClassName("stars");
let restartBtn = document.getElementById("restart");
let victoryModal = document.getElementById('victoryModal');
let victoryRestartBtn = document.getElementById("victoryClose");
let openCards = [];
let moveCount = 0;
let matchCount = 0;
const State = {
    OPEN: "open",
    MATCH: "match",
};


/**
 * Display the cards on the page
 *   - Shuffle the list of cards using the provided "shuffle" method below
 *   - Loop through each card and create its HTML
 *   - Add each card's HTML to the page
 *
 * Shuffle function from https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
 */
shuffleCards();


/**
 * Set up the event listener for a card. If a card is clicked:
 *  - Display the card's symbol (put this functionality in another function that you call from this one)
 *  - Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - If the list already has another card, check to see if the two cards match
 *    + If the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + If the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + Increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + If all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
for (let card of cards)
    card.addEventListener("click", onCardClicked);


/**
 * Set up the event listener to restart the game:
 *  - Reset all variables
 *  - Reset the UI
 *  - Shuffle the cards
 */
restartBtn.addEventListener("click", restartGame);


/**
 * Set up victory modal's event listeners
 */
// When the user clicks on the button, close the modal
victoryRestartBtn.onclick = function () {
    restartGame();
    victoryModal.style.display = "none";
};


/**
 * Main function: when a card is clicked
 * @param event: clicked event on cards
 */
function onCardClicked(event) {
    let card = event.target.nodeName === "I" ? event.target.parentNode : event.target;

    if (openCards.length === 2 || card.classList.contains(State.MATCH) || card.classList.contains(State.OPEN))
        return;

    openCards.push(card);
    if (openCards.length === 1)
        toggleCardSymbol(card, State.OPEN);
    else
        toggleCardSymbol(card, State.OPEN).done(cardPairHandler, updateScore);

    /**
     * Handle event when two cards are clicked open
     */
    function cardPairHandler() {
        let [card1, card2] = openCards;
        let state = card1.firstElementChild.className === card2.firstElementChild.className ? State.MATCH : State.OPEN;
        let animationStyle = state === State.MATCH ? "rubberBand" : "shake";
        animateCards(openCards, animationStyle).done(function () {
            for (let card of cards)
                card.classList.remove(animationStyle);
            toggleCardSymbol(card1, state); // Either close or keep cards open
            toggleCardSymbol(card2, state);
            if (state === State.MATCH) {
                matchCount++;
                checkVictory();
            }
            openCards = [];
        });
    }
}


/**
 * Function to animate a card, either shaking for unmatched or rubberBand for matched
 * @param cards
 * @param style: either shaking or rubberBand
 * @returns {*}
 *
 * Wait till a function finished with jQuery:
 * https://stackoverflow.com/questions/12116505/wait-till-a-function-with-animations-is-finished-until-running-another-function
 */
function animateCards(cards, style) {
    let r = $.Deferred();

    // do whatever you want (e.g. ajax/animations other asyc tasks)
    for (let card of cards)
        card.classList.add(style);

    setTimeout(function () {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 500);

    return r;
}

/**
 * Function to flip a card with animations
 * @param card
 * @param state: either MATCH or OPEN
 * @returns {*}
 *
 * Wait till a function finished with jQuery:
 * https://stackoverflow.com/questions/12116505/wait-till-a-function-with-animations-is-finished-until-running-another-function
 */
function toggleCardSymbol(card, state) {
    let r = $.Deferred();

    // do whatever you want (e.g. ajax/animations other asyc tasks)
    card.classList.toggle(state);

    setTimeout(function () {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 500);

    // return the deferred object
    return r;
}

/**
 * Call this function to restart the game
 */
function restartGame() {
    if (openCards.length <= 1) {
        function resetVariables() {
            openCards = [];
            moveCount = 0;
            matchCount = 0;
        }

        function resetUI() {
            for (let card of cards)
                card.className = "card";
            setStars(5);
            moveElement.innerText = "0 moves";
            vMoveElement.innerText = "0";
        }

        let r = $.Deferred();

        resetVariables();
        resetUI();

        setTimeout(function () {
            r.resolve();
        }, 150);

        r.done(shuffleCards);
    }
}


/**
 * Shuffle all cards
 */
function shuffleCards() {
    for (let i = deck.children.length; i >= 0; i--)
        deck.appendChild(deck.children[Math.random() * i | 0]);
}


/**
 * Call this function to increase move count, update both the variables and the UI
 */
function updateScore() {
    // First update moves
    moveCount++;
    moveElement.innerHTML = moveCount + (moveCount === 1 ? " move" : " moves");
    vMoveElement.innerHTML = moveCount;

    // Then update stars
    let accuracy = (matchCount + 5) / moveCount * 100; // The first 5 moves doesn't hurt
    let numStars = Math.ceil((accuracy > 100 ? 100 : accuracy) / 20);
    setStars(numStars);
}

function setStars(numStars) {
    for (let stars of starsList) {
        for (let i = stars.children.length - 1; i >= 0; i--) {
            stars.children[i].firstElementChild.className = i < numStars ? "fas fa-star" : "far fa-star";
        }
    }
}

/**
 * Function to show a victory modal
 */
function checkVictory() {
    if (matchCount === 8)
        victoryModal.style.display = "block";
}