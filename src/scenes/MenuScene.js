class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
  }

  create() {
    this.add.image(400, 300, 'surfer');
    this.add.text(95, 250, 'Click to Start!', { fontSize: '30px', fill: '#000000' });

    this.add.text(gameSize.height / 2, gameSize.width / 2, '(play)', {
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
