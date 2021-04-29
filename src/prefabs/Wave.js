export default class Wave extends Phaser.GameObjects.TileSprite {
    constructor(scene) {
        super(scene, scene.gameSize.width / 3, 0, 152, scene.gameSize.height, "wave_background")
        scene.add.existing(this);   // add to existing scene
        this.setOrigin(0.5, 0)
        this.origninalX = scene.gameSize.width / 3
    }

    addForground() {
        this.waveForeground = this.scene.add.tileSprite(this.origninalX, 0, 152, this.scene.gameSize.height, 'wave_foreground')
        this.waveShade = this.scene.add.rectangle(0, 0, this.origninalX, this.scene.gameSize.height, 0x00b0ff)
        this.waveForeground.setOrigin(0.5, 0)
        this.waveShade.setOrigin(0, 0)
        this.waveShade.setAlpha(0.7)
        this.waveShade.depth = 6;
        this.waveForeground.depth = 5;
    }

    update(frameNum) {
        // Move Wave Forwards & Backwards
        this.x = this.origninalX + Math.sin(Math.sin(frameNum / 700) * 30) * 100;
        if (frameNum % 2 == 0) this.waveForeground.tilePositionY += 128
        this.waveForeground.x = this.x;
        this.waveShade.width = this.x - 18;
    }

    resize() {
        this.height = this.scene.gameSize.height;
        this.waveForeground.height = this.scene.gameSize.height;
        this.waveShade.height = this.scene.gameSize.height
        this.origninalX = this.scene.gameSize.width / 3
    }

    reset() {
        // this.x = this.scene.gameSize.width / 3;
    }
}