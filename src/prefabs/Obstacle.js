class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, size, texture, label) {
        super(scene, -100, -100, texture); // Start offscreen
        scene.add.existing(this);   // add to existing scene
        scene.physics.add.existing(this) // add to physics simulator
        this.setOrigin(0.5,0.5);
        // this.setStatic(true);
        this.done = false;
        this.size = size // pixels per frame
        // this.anims.play(texture + '_anim');
    }

    reset(y) {
        this.x = this.scene.gameSize.width + (this.width / 2)
        this.y = y;
        this.done = false;
        return this;
    }

    update(speed)
    {
        if(this.x < -this.width) this.done = true;
        else  this.x -= speed;// move sprite left
    }
}