import Phaser from 'phaser'

export default class Surfer extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y) {
        super(scene.matter.world, x, y, "surfer", null,
            {
                // 'vertices': [{ "x": 60, "y": 6 }, { "x": 78, "y": 48 }, { "x": 60, "y": 106 }, { "x": 43, "y": 48 }]// An array, or an array of arrays, containing the vertex data in x/y object pairs
            }
        );
        scene.add.existing(this);   // add to existing scene
        this.setRectangle(75, 20);
        this.setFixedRotation(true);
        this.setSensor(true);
        this.setFriction(1)
        this.anims.play('surfer_idle_anim')
        this.setOrigin(0.65, 0.7)
        // var spriteBody = Phaser.Physics.Matter.PhysicsJSONParser.rectangle(0, 0, 25, 100)
        // this.setExistingBody(spriteBody)

        this.collidingWith = null;
        this.movementSpeed = 5;
        this.targetLocationX = this.scene.gameSize.width;
        this.targetLocationY = y
        // this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx

        // mouse input
        this.scene.input.on("pointermove", (pointer) => {      // callback
            // this.x += Phaser.Math.Clamp(this.x - pointer.x, 0, 2);
            // this.y += Phaser.Math.Clamp(this.y - pointer.y, 0, 2);
            // this.x = pointer.x;
            // this.y = pointer.y;
            this.targetLocationX = pointer.x
            this.targetLocationY = pointer.y
        }, this);

        window.addEventListener("deviceorientation", function (e) {
            var x = Math.floor(e.gamma);
            var y = Math.floor(e.beta);
            document.getElementById("credits_link").innerText = "X: " + x + ",Y: " + y
            this.targetLocationX = this.x + x * 10;
            this.targetLocationY = this.y + y * 10;
        }, true);
    }

    update(waveXPos) {
        if (this.x < -20) return;
        let forceX = 0.0001;
        let forceY = 0;
        let surfboardToWaveDistance = this.x - waveXPos - 10;
        // if (surfboardToWaveDistance < 0)
        //     forceX = 0.002 * 1 / Math.pow(surfboardToWaveDistance - 1, 2);
        // else if (surfboardToWaveDistance > 0)
        //     forceX = -0.002 * Math.log(surfboardToWaveDistance + 0.2);
        //-\left(.05x-1\right)^{2}-0.01^{\left(.01x\right)}
        // forceX = (-Math.pow(0.1 * surfboardToWaveDistance, 2) - Math.pow(0.01, 0.02 * surfboardToWaveDistance)) * 0.000001;
        forceX = (-Math.pow(0.5 * surfboardToWaveDistance, 2)) * 0.00001;
        // arrow keys
        if (keyLEFT.isDown) {
            this.targetLocationX -= this.movementSpeed;
        }
        if (keyRIGHT.isDown) {
            this.targetLocationX += this.movementSpeed;
        }
        if (keyUP.isDown) {
            this.targetLocationY -= this.movementSpeed;
        }
        if (keyDOWN.isDown) {
            this.targetLocationY += this.movementSpeed;
        }

        let xDelta = Phaser.Math.Clamp(this.targetLocationX - this.x, 0, 100)
        let yDelta = Phaser.Math.Clamp((this.targetLocationY - this.y) / 50, -this.movementSpeed, this.movementSpeed)

        // change surfer direction angle
        this.setAngle(yDelta * 1.5)
        // if (yDelta > 0.5)
        //     this.setAngle(10)
        // else if (yDelta < -0.5)
        //     this.setAngle(-10)
        // else {
        //     console.log(yDelta)
        //     this.setAngle(0)
        // }

        forceX += xDelta * 0.00008;
        forceY += yDelta * 0.0008;
        if (this.collidingWith != null) forceX -= 0.1;
        this.applyForce(new Phaser.Math.Vector2(forceX, forceY))



        // jump button
        if ((this.scene.input.activePointer.leftButtonReleased() || Phaser.Input.Keyboard.JustDown(keySPACE)) && !this.isJumping) {
            this.isJumping = true;
        }

        // if jumping, spin..
        if (this.isJumping) {
            // if (this.angle == -10) { this.setAngle(0); this.isJumping = false }
            // else this.setAngle(this.angle + 10)
        }

        let maxVelocity = 6
        // let velocityVector = new Phaser.Math.Vector2(this.body.velocity);
        let xVelocity = Phaser.Math.Clamp(this.body.velocity.x, -maxVelocity, maxVelocity)
        let yVelocity = Phaser.Math.Clamp(this.body.velocity.y, -maxVelocity, maxVelocity)
        if (this.collidingWith == null) {
            this.setVelocity(xVelocity, yVelocity)
        } else this.setVelocity(this.body.velocity.x, yVelocity)

        // if (velocityVector.length() > maxVelocity) {
        //     let newVelocity = velocityVector.normalize().scale(maxVelocity)
        //     console.log(newVelocity)
        //     this.setVelocity(newVelocity.x, newVelocity.y)
        // }

        this.y = Phaser.Math.Clamp(this.y, -10, this.scene.gameSize.height + 10);
        this.x = Phaser.Math.Clamp(this.x, -25, this.scene.gameSize.width + 25);
    }

    reset() {
        this.y = this.scene.gameSize.height / 2;
        this.x = this.scene.gameSize.width - 300;
        this.isJumping = false;
    }
}
