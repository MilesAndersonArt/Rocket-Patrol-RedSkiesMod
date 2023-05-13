class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('Title', './assets/Title.png');
        // load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.audio('sfx_enemydeath_1', './assets/deathnoise1.m4a');
        this.load.audio('sfx_enemydeath_2', './assets/deathnoise2.m4a');
        this.load.audio('sfx_enemydeath_3', './assets/deathnoise3.m4a');
        this.load.audio('sfx_enemydeath_4', './assets/deathnoise4.m4a');
        this.load.audio('sfx_bonus', './assets/pickupCoin.wav')
    }

    create() {
        // menu text configuration
        let menuConfig = {
            fontFamily: 'Courier New',
            fontSize: '28px',
            backgroundColor: '#fcc603',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        // show menu text
        this.title = this.add.sprite(game.config.width/2, game.config.height/2, 'Title');
        this.add.text(game.config.width/2 + 150, game.config.height/2 + borderUISize*2 + borderPadding*2 + 60, 'HIGH SCORE:' + highscore, menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
          // easy mode
          game.settings = {
            spaceshipSpeed: 3,
            gameTimer: 60000
          }
          timer = 60000
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
          // hard mode
          game.settings = {
            spaceshipSpeed: 4,
            gameTimer: 45000  
          }
          timer = 45000
          this.sound.play('sfx_select');
          this.scene.start("playScene");    
        }
  }
}