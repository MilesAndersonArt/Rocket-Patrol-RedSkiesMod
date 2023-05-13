/* Miles Anderson
    Title: RED SKY
    Time Taken: 14 hours 
    
    Mods Used:
    + Track a high score that persists across scenes and display it in the UI (5)
    + Implement the speed increase that happens after 30 seconds in the original game (5)
    + Create a new scrolling tile sprite for the background (5)
    + Create 4 new explosion sound effects and randomize which one plays on impact (10)
    + Display the time remaining (in seconds) on the screen (10)
    + Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
    + Create a new title screen (e.g., new artwork, typography, layout) (10)
    + Implement parallax scrolling for the background (10)
    + Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (15)
    + Implement mouse control for player movement and mouse click to fire (15)
    + Implement a new timing/scoring mechanism that adds time to the clock for successful hits (15)
 
    Sources:
    - I borrowed the speed increase code from Nhan Nguyen's Rocket Patrol mod.
        - Credit: https://github.com/Ataru2002/Rocket-Patrol
    - 'enemydeath' sound effects recorded by me through Voice Memos app
    - 'pickupCoin' sound effect created with jsfxr
*/ 

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
} // Object literal: Defining an object with specific property values



let game = new Phaser.Game(config);
// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
// set play variables
let timer = 60000;
let highscore = 0;
// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;
// reserve mouse input variables
let input;
let cursorx;
let cursory;
let mousedown = false;

