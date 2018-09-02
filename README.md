# Matching Game Project

Matching Game is the second project for Udacity Front-End Web Developer Nanodegree Program. 

## How The Game Works
The game board consists of sixteen "cards" arranged in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. The cards are arranged randomly on the grid with the symbol face down. The gameplay rules are very simple: flip over two hidden cards at a time to locate the ones that match!

Each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over.
* If the cards do not match, both cards are flipped face down.

The game ends once all cards have been correctly matched.

Live Demo on [Github Page](https://minhkhang1795.github.io/udacity-matching-game/)

## Implemented functionalities
* [x] Shuffle the cards when a match begins.
* [x] The player can click on a card to flip it open.
* [x] Two opened cards if matched will stay opened; otherwise, the cards are flipped face down.
* [x] Show animations when opening or closing a card and when two cards are matched or unmatched.
* [x] Timer on the top to show how much time the player has spent.
* [x] Counter on the top to show how many times the player flips the cards.
* [x] Star panel to show the player's performance. 
* [x] Restart button allows the player to restart the game.
* [x] When the player wins the game, the victory modal will pop up.
* [x] The game will show a warning if the player tries to tamper with the back-end logic.

## Credits
* Project Template:
    * https://github.com/udacity/fend-project-memory-game
* CSS:
    * Create CSS Modal: https://www.w3schools.com/howto/howto_css_modals.asp
    * Animation toolbox: https://github.com/daneden/animate.css
    * Animated Check & Cross: https://codepen.io/elevaunt/pen/JYRBzJ
* JS:
    * Shuffle elements: https://stackoverflow.com/questions/7070054/javascript-shuffle-html-list-element-order
    * Wait till a function finished with jQuery: https://stackoverflow.com/questions/12116505/wait-till-a-function-with-animations-is-finished-until-running-another-function

## Note
Incompatible with Edge and Explorer.

## MIT License

    Copyright 2018 Minh-Khang Vu

    Permission is hereby granted, free of charge, to any person obtaining a copy 
    of this software and associated documentation files (the "Software"), to deal 
    in the Software without restriction, including without limitation the rights 
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies 
    of the Software, and to permit persons to whom the Software is furnished to do 
    so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all 
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS 
    FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR 
    COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER 
    IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
