// Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, speed) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);   // add to existing scene
        this.points = pointValue;   // store pointValue
        this.moveSpeed = game.settings.spaceshipSpeed + speed;         // pixels per frame

    }

    update() {
        // spaceship left
        this.x -= this.moveSpeed;
        // wrap around from right edge to left edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }

    }

    // position reset
    reset() {
        this.x = game.config.width;
    }
}