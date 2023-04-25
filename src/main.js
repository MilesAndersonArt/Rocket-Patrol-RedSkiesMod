// Miles Anderson
// Title: RED SKY
// Time Taken:
// 
// Mods Used:
// Create 4 new explosion sound effects and randomize which one plays on impact (10)
// Display the time remaining (in seconds) on the screen (10)
// Using a texture atlas, create a new animated sprite for the Spaceship enemies (10)
// Create a new title screen (e.g., new artwork, typography, layout) (10)
// 
// Sources:
// 

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

// reserve keyboard variables
let keyF, keyR, keyLEFT, keyRIGHT;

