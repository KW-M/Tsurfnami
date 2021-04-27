import Phaser from 'phaser'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
  }

  create() {
    this.gameSize = this.game.scale.gameSize;
    this.add.image(this.gameSize.height / 2 - 200, this.gameSize.width / 2, 'surfer').setOrigin(0.5, 0.5);
    this.add.text(95, 250, 'Click to Start!', { fontSize: '30px', fill: '#000000' });

    this.add.text(this.gameSize.height / 2, this.gameSize.width / 2, '(play)', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerup', () => {
      this.scene.stop('MenuScene')
      this.scene.start('PlayScene')
    });
  }
}
