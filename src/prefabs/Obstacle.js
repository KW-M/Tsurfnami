import Phaser from 'phaser'

export default class Obstacle extends Phaser.Physics.Matter.Sprite {
    constructor(scene, label, texture, weight, hitboxHeight, hitboxWidth) {
        // Start offscreen (-100,-100)
        super(scene.matter.world, -100, -100, texture, null, {
            // shape: 'circle',
            // 'circleRadius': size
        });
        scene.add.existing(this);   // add to existing scene
        this.setOrigin(0.5, 0.5);
        this.setStatic(false);
        this.setSensor(false);
        this.setRectangle(hitboxWidth, hitboxHeight)
        this.body.label = label;
        this.depth = 3;
        this.done = false;
        this.destroyed = false;
        // this.size = size // pixels per frame
        // this.anims.play(texture + '_anim');

    }

    reset(y) {
        if (this.body.label == 'shark') this.x = 0;
        else this.x = this.scene.gameSize.width + (this.width / 2);
        this.y = y;
        this.setFrame(0)
        this.done = false;
        this.destroyed = false;
        return this;
    }

    playDestroyAnim() {
        this.destroyed = true;
        this.anims.play(this.body.label + "_crash_anim");
        this.on('animationcomplete', () => {    // callback after anim completes
            this.done = true;   // set the done flag so the play scene can clean up / delete this obstacle
        });
    }

    update(speed) {
        if (this.x < -this.width) {
            this.done = true;
        } else if (this.body.label == 'shark')
            this.setVelocity(speed, 0);
        else
            this.setVelocity(-speed, 0);// move sprite left
    }
}