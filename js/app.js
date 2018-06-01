/**
 * Create a list that holds all of your cards
 */
let deck = document.getElementById("deck");
let cards = document.getElementsByClassName("card");
let moveElement = document.getElementById("moves");
let restartBtn = document.getElementById("restart");
let openCards = [];
let moveCount = 0;
let matchCount = 0;
let State = {
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
// shuffleCards();


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
        toggleCardSymbol(card, State.OPEN).done(increaseMoves, cardPairHandler);

    /**
     * Handle event when two cards are clicked open
     */
    function cardPairHandler() {
        let [card1, card2] = openCards;
        let state = card1.firstElementChild.className === card2.firstElementChild.className ? State.MATCH : State.OPEN;
        toggleCardSymbol(card1, state);
        toggleCardSymbol(card2, state);
        if (state === State.MATCH) {
            matchCount++;
            if (matchCount === 8) {
                console.log("win");
            }
        }
        openCards = [];
    }
}


/**
 * Function to flip a card with animation
 * @param card
 * @param className: either MATCH or OPEN
 * @returns {*}
 *
 * Wait till a function finished with jQuery:
 * https://stackoverflow.com/questions/12116505/wait-till-a-function-with-animations-is-finished-until-running-another-function
 */
function toggleCardSymbol(card, className) {
    let r = $.Deferred();

    // do whatever you want (e.g. ajax/animations other asyc tasks)
    card.classList.toggle(className);

    setTimeout(function () {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 800);

    // return the deferred object
    return r;
}


/**
 * Call this function to restart the game
 */
function restartGame() {
    function resetVariables() {
        openCards = [];
        moveCount = 0;
        matchCount = 0;
    }

    function resetUI() {
        for (let card of cards)
            card.className = "card";
        moveElement.innerText = "0 moves";
    }

    let r = $.Deferred();

    resetVariables();
    resetUI();

    setTimeout(function () {
        r.resolve();
    }, 800);

    r.done(shuffleCards);
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
function increaseMoves() {
    moveCount++;
    moveElement.innerHTML = moveCount + (moveCount === 1 ? " move" : " moves");
}