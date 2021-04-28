import Phaser from 'phaser'
import ScoreOverlay from "/src/prefabs/scoreOverlay"
import Obstacle from "/src/prefabs/obstacle"
import Surfer from "/src/prefabs/Surfer"
import Wave from "/src/prefabs/Wave"

export default class PlayScene extends Phaser.Scene {
    constructor() {
        super({ key: "playScene" });
    }

    create() {
        this.gameSize = this.game.scale.gameSize;
        this.matter.set30Hz();

        // setup variables
        this.game.worldSpeed = 10
        this.doomLevel = 0;

        // define keys
        window.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        window.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        window.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        window.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        window.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let music = this.sound.add('soundtrack', { loop: true });
        // music.play();

        // place background tile sprite
        this.oceanBackground = this.add.tileSprite(0, 0, this.gameSize.width, this.gameSize.height, 'ocean_tile').setOrigin(0, 0);
        this.oceanBackground.setAlpha(0.6);
        this.wave = new Wave(this, this.gameSize.width / 3, this.gameSize.height);

        // place obstacles
        this.obstacleGameObjects = [
            new Obstacle(this, 10, 'coconut_crash', 'coconut0'),
            new Obstacle(this, 10, 'wood_crash', 'wood0'),
            new Obstacle(this, 10, 'coconut_crash', 'coconut1'),
            new Obstacle(this, 10, 'boat', 'boat1'),
            new Obstacle(this, 10, 'wood_crash', 'wood1'),
            new Obstacle(this, 10, 'hook', 'hook3'),
        ]
        for (let i = 0; i < this.obstacleGameObjects.length; i++) {
            setTimeout(() => {
                this.obstacleGameObjects[i].reset(Math.random() * this.gameSize.height)
            }, i * 1000);
        }

        // add player and wave
        this.player = new Surfer(this, this.wave.x + 90, this.gameSize.height / 2);
        this.wave.addForground();

        this.player.setOnCollide((event) => {
            if ("vibrate" in window.navigator && window.navigator.vibrate != undefined) {
                window.navigator.vibrate(100);
            }
            this.scoreOverlay.incrementDoomLevel(-5)
            console.log("colision!", event.bodyA.label)
            this.player.collidingWith = event.bodyA.label;
            this.destroyObstacle(event.bodyA.label)
        })
        this.player.setOnCollideEnd((event) => {
            console.log("colision end!", event.bodyA.label, "Last collding with: " + this.player.collidingWith)
            if (event.bodyA.label == this.player.collidingWith)
                this.player.collidingWith = null;
        })

        //surfer animation
        this.anims.create({
            key: 'surfer_idle_anim',
            frames: this.anims.generateFrameNumbers('surfer',
                { start: 0, end: 4, first: 0 }),
            frameRate: 5,
            repeat: Infinity
        });

        this.anims.create({
            key: 'boat_crash_anim',
            frames: this.anims.generateFrameNumbers('boat',
                { start: 0, end: 3, first: 0 }),
            frameRate: 30
        });

        this.anims.create({
            key: 'coconut_crash_anim',
            frames: this.anims.generateFrameNumbers('coconut_crash',
                { start: 0, end: 5, first: 0 }),
            frameRate: 30
        });

        this.anims.create({
            key: 'wood_crash_anim',
            frames: this.anims.generateFrameNumbers('wood_crash',
                { start: 0, end: 5, first: 0 }),
            frameRate: 20,
            repeat: 0
        });

        // high score is saved across games played
        this.hScore = localStorage.getItem("score") || 0;

        // GAME OVER flag
        this.gameOver = false;
        this.scoreOverlay = new ScoreOverlay(this)

        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.gameSize = gameSize;
            this.wave.resize(gameSize)
            this.scoreOverlay.resize(gameSize)
            this.oceanBackground.height = this.gameSize.height
            this.oceanBackground.width = this.gameSize.width;
        })

    }

    showGameOver() {
        this.gameOver = true;
        this.time.removeAllEvents();
        // scores display configuration
        let scoreConfig = {
            fontFamily: "Courier",
            fontSize: "40px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "left",
            padding: { top: 20, bottom: 20, left: 20, right: 20 },
        };
        let score = this.scoreOverlay.clock
        this.add.text(this.gameSize.width / 2, this.gameSize.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
        this.add.text(this.gameSize.width / 2, this.gameSize.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);

        this.scoreLeft = this.add.text(
                this.gameSize.width / 2, // x-coord
                54, // y-coord
                "Score: " + score, // initial text
                scoreConfig // config settings
            ).setOrigin(0.5, 0);

        this.best = this.add.text(
                this.gameSize.width / 2, // x-coord
                108, // y coord
                "Best: " + this.hScore, // initial text
                scoreConfig // config settings
            ).setOrigin(0.5, 0);
        // // update the high score
        if (score > this.hScore) {
            this.hScore = score;
            localStorage.setItem("score", this.hScore);
            this.best.text = "Best: " + this.hScore;
        }
    }

    update() {
        this.oceanBackground.tilePositionX += this.game.worldSpeed;
        if (this.game.loop.frame % 3 == 0) this.oceanBackground.tilePositionX += 128;

        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
            this.scene.remove();
        }

        // when game is over remove the game clock event
        if (this.gameOver) {
            return;
        } else {
            this.wave.update(this.game.loop.frame);
            this.player.update(this.wave.x);  // update surfer sprite
            if (this.player.x < -8) this.showGameOver();

            this.game.worldSpeed = 25 * Math.log(this.scoreOverlay.doomLevel + 1);

            // update all obstacle sprites:
            for (let i = 0; i < this.obstacleGameObjects.length; i++) {
                let obstacle = this.obstacleGameObjects[i];
                obstacle.update(this.game.worldSpeed);

                // if (obstacle.x + 10 > this.wave.x) {
                //     obstacle.destroyed = true;
                //     obstacle.anims.play(obstacle.body.label + "_crash_anim");
                // }

                if (obstacle.done == true) obstacle.reset(Math.random() * this.gameSize.height);
            }
            this.scoreOverlay.incrementDoomLevel(0.4 / Math.abs(this.wave.x - this.player.x))
        }
    }

    destroyObstacle(label) {
        for (let i = 0; i < this.obstacleGameObjects.length; i++) {
            let obstacle = this.obstacleGameObjects[i];
            if (obstacle.body.label == label && obstacle.destroyed == false) {
                obstacle.destroyed = true;
                obstacle.anims.play(obstacle.body.label + "_crash_anim");

                // obstacle.body.se
                obstacle.on('animationcomplete', () => {    // callback after anim completes
                    obstacle.reset();                         // reset ship position
                });
                this.sound.play('sfx_explosion');
            }
        }
        // // temporarily hide ship
        // ship.alpha = 0;
        // // create explosion sprite at ship's position
        // obstacle.anims.play('explosion');             // play explode animation
        // boom.on('animationcomplete', () => {    // callback after anim completes
        //     ship.reset();                         // reset ship position
        //     ship.alpha = 1;                       // make ship visible again
        //     boom.destroy();                       // remove explosion sprite
        // });
        // // score add and repaint
        // this.p1Score += 1;
        // this.scoreLeft.text = this.p1Score;

        // this.scoreLeft.text = "Score: " + this.p1Score;



    }



}
