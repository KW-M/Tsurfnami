class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: "playScene" });
    }


    create() {
        this.gameSize = this.game.scale.gameSize;
        // setup variables
        this.game.worldSpeed = 3
        this.doomLevel = 0;

        // define keys
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let music = this.sound.add('soundtrack', { loop: true });
        // music.play();

        // place background tile sprite
        this.oceanBackground = this.add.tileSprite(0, 0, this.gameSize.width, this.gameSize.height, 'ocean_tile').setOrigin(0, 0);
        this.oceanBackground.setAlpha(0.5)

        // place obstacles
        this.obstacleGameObjects = [
            new Obstacle(this, 10, 'spaceshipfast', 'coconut').reset(Math.random()*this.gameSize.height),
            new Obstacle(this, 10, 'spaceshipfast', 'coconut').reset(Math.random()*this.gameSize.height)
        ]

        // add player and wave
        this.player = new Surfer(this, this.gameSize.width / 3, this.gameSize);
        this.wave = new Wave(this, this.gameSize.width / 3, this.gameSize);
        this.wave.create(this.gameSize)

        // //explosion animation
        // this.anims.create({
        //     key: 'explosion',
        //     frames: this.anims.generateFrameNumbers('explosion',
        //         { start: 0, end: 6, first: 0 }),
        //     frameRate: 30
        // });

        // //spaceship aimation
        // this.anims.create({
        //     key: 'spaceship',
        //     frames: this.anims.generateFrameNumbers('spaceship',
        //         { start: 0, end: 3, first: 0 }),
        //     frameRate: 20,
        //     repeat: Infinity
        // });


        // high score is saved across games played
        this.hScore = localStorage.getItem("score") || 0;

        // GAME OVER flag
        this.gameOver = false;

        this.scoreOverlay = new ScoreOverlay(this)

        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.gameSize = gameSize;
            this.wave.height = this.gameSize.height
            this.wave.resize(gameSize)
            this.oceanBackground.height = this.gameSize.height
            this.oceanBackground.width = this.gameSize.width;
        })

    }

    showGameOver() {
        this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(game.config.width / 2, game.config.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
        // // scores display configuration
        // let scoreConfig =
        // {
        //     fontFamily: "Courier",
        //     fontSize: "20px",
        //     backgroundColor: "#f3b141",
        //     color: "#843605",
        //     align: "left",
        //     padding: { top: 5, bottom: 5 },
        //     fixedWidth: 150
        // };
        // this.scoreLeft = this.add.text
        //     (
        //         50, // x-coord
        //         54, // y-coord
        //         "Score: " + this.p1Score, // initial text
        //         scoreConfig // config settings
        //     );
        // this.best = this.add.text
        //     (
        //         225, // x-coord
        //         54, // y coord
        //         "Best: " + this.hScore, // initial text
        //         scoreConfig // config settings
        //     );
    }

    update() {
        this.oceanBackground.tilePositionX += this.game.worldSpeed;

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // when game is over remove the game clock event
        if (this.gameOver) {
            this.time.removeAllEvents();
            this.showGameOver();
        } else {
            this.player.update();  // update surfer sprite
            this.wave.update();
            // update all obstacle sprites:
            for (let i = 0; i < this.obstacleGameObjects.length; i++) {
                let obstacle = this.obstacleGameObjects[i];
                obstacle.update(this.game.worldSpeed);
                if(obstacle.done == true) obstacle.reset();
            }
        }
    }


    // checkCollision(rocket, ship) {
    //     if (rocket.x < ship.x + ship.width &&
    //         rocket.x + rocket.width > ship.x &&
    //         rocket.y < ship.y + ship.height &&
    //         rocket.height + rocket.y > ship.y) {
    //         return true;
    //     } else {
    //         return false;
    //     }

    // }

    // shipExplode(ship) {
    //     // temporarily hide ship
    //     ship.alpha = 0;
    //     // create explosion sprite at ship's position
    //     let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
    //     boom.anims.play('explosion');             // play explode animation
    //     boom.on('animationcomplete', () => {    // callback after anim completes
    //         ship.reset();                         // reset ship position
    //         ship.alpha = 1;                       // make ship visible again
    //         boom.destroy();                       // remove explosion sprite
    //     });
    //     // score add and repaint
    //     this.p1Score += 1;
    //     this.scoreLeft.text = this.p1Score;

    //     // update the high score
    //     if (this.p1Score > this.hScore) {
    //         this.hScore = this.p1Score;
    //         localStorage.setItem("score", this.hScore);
    //         this.best.text = "Best: " + this.hScore;
    //     }
    //     this.scoreLeft.text = "Score: " + this.p1Score;

    //     this.sound.play('sfx_explosion');

    // }



}
