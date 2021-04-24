class Wave extends Phaser.GameObjects.TileSprite {
    constructor(scene) {
        super(scene, scene.gameSize.width / 3, 0,8, scene.gameSize.height, "wave");
        scene.add.existing(this);   // add to existing scene
        this.setOrigin(0, 0)
        this.origninalX = scene.gameSize.width / 3
        // this.anims.play('wave_anim');

        this.waveShade = this.scene.add.tileSprite(0, 0, this.origninalX *2,this.scene.gameSize.height *2,'wave_background')
        this.waveShade.setAlpha(0.5)

    }
    create() {

    }

    update() {
        // Move Wave Forwards & Backwards
        this.x = this.origninalX + Math.sin(Date.now() / 4000) * 30;
        this.tilePositionY += 65
        this.waveShade.width = this.x * 2;
    }

    resize() {
        this.waveShade.height = this.scene.gameSize.height * 2
        this.origninalX = this.scene.gameSize.width / 3
    }

    reset() {
        // this.x = this.scene.gameSize.width / 3;
    }
}