// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed;         // pixels per frame
        // this.gameTimer = game.settings.gameTimer; // gameTimer
    }

    update() {
        // spaceship left
        this.x -= this.moveSpeed;

        // accelerate moveSpeed after 30 seconds
        // if (this.gameTimer == this.gameTimer - 30000) {
        //     this.moveSpeed * 2;
        // }

        // wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}