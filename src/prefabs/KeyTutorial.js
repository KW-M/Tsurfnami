import Phaser from 'phaser';
let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '38px',
    color: '#060606',
    align: 'center',
    fixedWidth: 50
};

export default class KeyTut extends Phaser.GameObjects.Image {
    constructor(scene, x, y, label) {
        super(scene, x, y, 'key_bg')
        scene.add.existing(this);
        this.setScale(0.8, 0.8);
        this.setOrigin(0.5, 0.5)
        this.setAlpha(0.5)

        this.txt = scene.add.text(x, y, label, scoreConfig).setOrigin(0.5, 0.5);
    }
    fadeOut() {
        if (this.alphaT == undefined) this.alphaT = 10;
        else if (this.alphaT > 0) {
            this.txt.setAlpha(this.alphaT / 10)
            this.setAlpha(this.alphaT / 20)
            this.alphaT--;
        }
        else if (this.alphaT == 0) { this.txt.destroy(); this.destroy(); return; }
        window.setTimeout(() => { this.fadeOut() }, 50)
    }
}