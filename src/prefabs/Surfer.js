class Surfer extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "surfer");
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this) // add to physics simulator

        this.movementSpeed = 5;
        // this.sfxRocket = scene.sound.add('sfx_rocket'); // add rocket sfx
    }

    update() {
        // mouse input
        this.scene.input.on("pointermove", // event
            (pointer) => {      // callback
                // this.x += Phaser.Math.Clamp(this.x - pointer.x, 0, 2);
                // this.y += Phaser.Math.Clamp(this.y - pointer.y, 0, 2);
                this.x = pointer.x;
                this.y = pointer.y;
            },
            this);

        // arrow keys
        if (keyLEFT.isDown) {
            this.x -= this.movementSpeed;
        }
        if (keyRIGHT.isDown) {
            this.x += this.movementSpeed;
        }
        if (keyUP.isDown) {
            this.y -= this.movementSpeed;
        }
        if (keyDOWN.isDown) {
            this.y += this.movementSpeed;
        }

        // jump button
        if ((this.scene.input.activePointer.leftButtonDown() || Phaser.Input.Keyboard.JustDown(keySPACE)) && !this.isJumping) {
            this.isJumping = true;
        }

        // if jumping, spin..
        if (this.isJumping) {
            if(this.angle == 359) {this.setAngle(0);this.isJumping = false}
            else this.setAngle(this.angle + 1)
        }

        this.y = Phaser.Math.Clamp(this.y, 0, this.scene.gameSize.height);
    }

    reset(){
        this.y = this.scene.gameSize.height / 2;
        this.isJumping = false;
    }
}
