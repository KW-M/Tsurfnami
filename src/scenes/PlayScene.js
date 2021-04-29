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
        this.worldSpeed = 10
        this.doomLevel = 0;
        this.nextSpawnTime = 0;

        console.log(this.nextSpawnTime, ":next spawn time")

        // define keys
        window.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        window.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        window.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        window.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        window.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        let music = this.sound.add('soundtrack', { loop: true });
        // music.play();

        //Setup Animations
        this.anims.create({
            key: 'surfer_idle_anim',
            frames: this.anims.generateFrameNumbers('surfer',
                { start: 0, end: 3, first: 0 }),
            frameRate: 5,
            repeat: Infinity
        });


        this.anims.create({
            key: 'shark_idle_anim',
            frames: this.anims.generateFrameNumbers('shark',
                { start: 0, end: 2, first: 0 }),
            frameRate: 30,
            repeat: 0
        });


        this.anims.create({
            key: 'boat_crash_anim',
            frames: this.anims.generateFrameNumbers('boat',
                { start: 0, end: 3, first: 0 }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'stone_crash_anim',
            frames: this.anims.generateFrameNumbers('stone_crash',
                { start: 0, end: 3, first: 0 }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'coconut_crash_anim',
            frames: this.anims.generateFrameNumbers('coconut_crash',
                { start: 0, end: 5, first: 0 }),
            frameRate: 30,
            repeat: 0
        });

        this.anims.create({
            key: 'wood_crash_anim',
            frames: this.anims.generateFrameNumbers('wood_crash',
                { start: 0, end: 5, first: 0 }),
            frameRate: 20,
            repeat: 0
        });

        // a list of obstacles and each ones options that we can use when spawning new obstacles.
        this.avalableObstacles = [
            {
                'label': 'coconut',
                'sprite': 'coconut_crash',
                'hitboxSize': 20,
                'weight': 1,
            },
            {
                'label': 'wood',
                'sprite': 'wood_crash',
                'hitboxSize': 35,
                'weight': 1.5,
            },
            {
                'label': 'stone',
                'sprite': 'stone_crash',
                'hitboxSize': 25,
                'weight': 2.5,
            },
            {
                'label': 'shark',
                'sprite': 'shark',
                'hitboxSize': 25,
                'weight': 2.5,
            },
        ]

        // An array to hold all the obstacle instances in play.
        this.obstacleGameObjects = []
        this.obstacleGameObjects.push(this.spawnRandomObstacle())//Spawn one to get it going
        this.obstacleLabelCounter = 0;

        // place background tile sprite
        this.oceanBackground = this.add.tileSprite(0, 0, this.gameSize.width, this.gameSize.height, 'ocean_tile').setOrigin(0, 0);
        this.oceanBackground.setAlpha(0.6);

        // Place wave in two parts, background & foreground
        this.wave = new Wave(this, this.gameSize.width / 3, this.gameSize.height);
        this.wave.addForground();

        // add player (surfer)
        this.player = new Surfer(this, this.wave.x + 90, this.gameSize.height / 2);
        this.player.anims.play('surfer_idle_anim')
        this.player.setOnCollide((event) => {
            //this weird syntax is an if statement on a single line: if event.bodyA.label == "surfer" then collideBodyLabel = event.bodyB.label else collideBodyLabel = event.bodyA.label
            let collideBodyLabel = (event.bodyA.label == "surfer") ? event.bodyB.label : event.bodyA.label;
            console.log("colision!", collideBodyLabel, event)
            if (window.navigator && window.navigator.vibrate != undefined) window.navigator.vibrate(100);
            this.scoreOverlay.incrementDoomLevel(-5)
            this.player.collidingWith = collideBodyLabel;
            this.destroyObstacleByBody((event.bodyA.label == "surfer") ? event.bodyB : event.bodyA);
            // this.sound.play('sfx_explosion');
        })
        this.player.setOnCollideEnd((event) => {
            let collideBodyLabel = (event.bodyA.label == "surfer") ? event.bodyB.label : event.bodyA.label;
            console.log("colision end!", collideBodyLabel, "Last collding with: " + this.player.collidingWith)
            if (collideBodyLabel == this.player.collidingWith)
                this.player.collidingWith = null;
        })

        // high score is saved across games played
        this.hScore = localStorage.getItem("score") || 0;

        // Add the score overlay (Clock + Doom bar stuff)
        this.scoreOverlay = new ScoreOverlay(this)

        // handle when the screen size changes (device rotated, window resized, etc...)
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            this.gameSize = gameSize;
            this.wave.resize(gameSize)
            this.scoreOverlay.resize(gameSize)
            this.oceanBackground.height = this.gameSize.height
            this.oceanBackground.width = this.gameSize.width;
        })
    }

    spawnRandomObstacle() {
        this.obstacleLabelCounter += 1;
        let newObstacleIndex = Math.floor(Math.random() * this.avalableObstacles.length);
        let opts = this.avalableObstacles[newObstacleIndex];
        return new Obstacle(this, opts.label, opts.sprite, opts.weight, opts.hitboxSize).reset(Math.random() * this.gameSize.height);
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
        this.add.text(this.gameSize.width / 2, this.gameSize.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5).depth = 30;
        this.add.text(this.gameSize.width / 2, this.gameSize.height / 2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5).depth = 30;

        // update the high score
        if (score > this.hScore) {
            this.hScore = score;
            localStorage.setItem("score", this.hScore);
        }

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
    }

    update() {
        // update the worldspeed based on the doom level variable in the scoreOverlay.
        // Original Formula: 25 * Math.log(this.scoreOverlay.doomLevel + 1);
        this.worldSpeed = 25 * Math.log(this.scoreOverlay.doomLevel / 2 + 1);

        // move the ocean background tile sprite
        this.oceanBackground.tilePositionX += this.worldSpeed;
        if (this.game.loop.frame % 3 == 0) this.oceanBackground.tilePositionX += 128; // every 3rd frame make the tilesprite jump by 128 px (1 frame width) so it appears to animate

        // when game is over, don't do anything, just check for input.
        if (this.gameOver) {
            // check key input for restart
            if (Phaser.Input.Keyboard.JustDown(keyR) || this.input.activePointer.isDown) {
                // this.scene.stop();
                // this.game.scene.start("loadingScene")
                // // this.scene.remove();
                window.location.reload();

            }
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.scene.start("menuScene");
                this.scene.remove();
            }
            return; // return here just ends the update function early.
        }

        // update wave and player sprites
        this.wave.update(this.game.loop.frame);
        this.player.update(this.wave.x, this.worldSpeed);  // update surfer sprite
        if (this.player.x < -8) this.showGameOver();

        // update all obstacle sprites:
        for (let i = 0; i < this.obstacleGameObjects.length; i++) {
            let obstacle = this.obstacleGameObjects[i];

            // call this obstacle's update function, and give it the world speed, so it knows how many pixels to move
            obstacle.update(this.worldSpeed);
            if (obstacle.done == true) {
                this.obstacleGameObjects.splice(i, 1) // delete the obstacle from the array of game objects;
                obstacle.destroy();
            }

            // if (obstacle.x + 10 < this.wave.x) obstacle.playDestroyAnim()
            if (this.game.loop.frame > this.nextSpawnTime && this.obstacleGameObjects.length < 10) {
                this.nextSpawnTime = this.game.loop.frame + 5 * Math.random();
                this.obstacleGameObjects.push(this.spawnRandomObstacle())
            }
        }

        this.scoreOverlay.incrementDoomLevel(Math.min(0.4 / Math.abs(this.wave.x - this.player.x), 0.1));
    }

    destroyObstacleByBody(collisionBody) {
        console.log("Destoring Obstacle", collisionBody)
        for (let i = 0; i < this.obstacleGameObjects.length; i++) {
            let obstacle = this.obstacleGameObjects[i];
            if (obstacle.body == collisionBody && obstacle.destroyed == false) {
                console.log("Destoring Obstacle Finally", collisionBody)
                obstacle.playDestroyAnim()
            }
        }
    }

}
