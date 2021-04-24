class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
  }

  create() {
    this.add.image(400, 300, 'surfer');

    this.add.text(gameSize.height / 2, gameSize.width / 2, '(play)', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    this.input.on('pointerdown', function () {
      this.scene.switch('playScene');
    }, this);

  }
}
