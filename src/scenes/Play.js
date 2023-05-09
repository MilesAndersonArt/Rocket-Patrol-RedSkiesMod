class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
        // place tile sprite background
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.starfield.setInteractive();
        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (player 1)
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);

        // add Spaceships (x4)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width + borderUISize*6 - 50, borderUISize*4 - 50, 'spaceship', 0, 40).setOrigin(0,0);


        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // initialize score
        this.p1Score = 0;
        // this.p2Score = 0;
        this.timeLeft = timer / 1000;
        // display score
        let scoreConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5, 
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        this.timerCounter = this.add.text(borderUISize + borderPadding + 450, borderUISize + borderPadding*2, 'Time:' + this.timeLeft, scoreConfig);
        
        this.startTimer(1000000000);
        // GAME OVER flag
        this.gameOver = false;
        // AccelerationTrigger flag
        this.accelerationTrigger = true;
        // Input
        input = this.input;
        input.on('pointerdown', this.clicked, this);
        input.on('pointerup', this.notClicked, this);

    }

    update() {
        cursorx = input.x;
        cursory = input.y;
        // Timer Settings
        const elapsed = this.timerEvent.getElapsed()
        const remaining = Math.max(0, timer - elapsed)
        this.timeLeft = remaining / 1000;
        this.timerCounter.text = this.timeLeft.toFixed(0);
        // Spaceship Acceleration
        if ((elapsed / 1000).toFixed(0) == 30 && this.accelerationTrigger) {
            game.settings.spaceshipSpeed += 3;
            this.accelerationTrigger = false;
        }
        // Timer Game Over Conditions
        if(this.timeLeft <= 0) {
            let scoreConfig = {
                fontFamily: 'Courier New',
                fontSize: '28px',
                backgroundColor: '#820000',
                color: '#030000',
                align: 'right',
                padding: {
                top: 5,
                bottom: 5,
                },
                fixedWidth: 0
            }
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }

        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            highscore = Math.max(this.p1Score)
            this.scene.restart();
            this.gameOver = false;
            timer = 60000;
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            highscore = Math.max(this.p1Score)
            this.scene.start("menuScene");
            this.gameOver = false;
            timer = 60000;
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
            this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship04)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
        }
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
        if(ship.points == 40){
            timer += 5000;
        }
        this.p1Score += ship.points;
        this.scoreLeft.text = 'P1:' + this.p1Score; 
        
        this.sound.play('sfx_explosion');
      }

      startTimer(duration = 60000){
        this.timerEvent = this.time.addEvent({
            delay: duration
        })
      }
      clicked(){
        mousedown = true;
      }
      notClicked(){
        mousedown = false;
      }
}