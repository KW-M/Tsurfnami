import Phaser from 'phaser'
import KeyTutorial from '../prefabs/KeyTutorial'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menuScene' });
  }

  create() {
    this.gameSize = this.game.scale.gameSize;

    let bg_image = this.add.image(this.gameSize.width / 2, this.gameSize.height / 2, 'menu_bg').setOrigin(0.5, 0.5)
    let scaleFactor = this.gameSize.width / bg_image.width;
    bg_image.setScale(scaleFactor);

    this.add.text(this.gameSize.width * (5 / 8), this.gameSize.height * 0.3, 'Surf Fast. Die Rad.', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    let keyX = this.gameSize.width * (5 / 8);
    let keyY = this.gameSize.height * (2 / 3);

    let move_mouse_tut = this.add.image(this.gameSize.width * (1 / 8), keyY, 'move_mouse_tutorial').setOrigin(0.5, 0.5).setScale(0.8);
    this.add.text(this.gameSize.width * (2 / 8), keyY, '+', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);
    let click_mouse_tut = this.add.image(this.gameSize.width * (3 / 8), keyY, 'click_mouse_tutorial').setOrigin(0.5, 0.5).setScale(2.5)

    this.add.text(this.gameSize.width * (4 / 8), keyY, 'or', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    let keyWidth = 30;
    new KeyTutorial(this, keyX + (keyWidth * 2), keyY + keyWidth, '→')
    new KeyTutorial(this, keyX - (keyWidth * 2), keyY + keyWidth, '←')
    new KeyTutorial(this, keyX, keyY - keyWidth, '↑')
    new KeyTutorial(this, keyX, keyY + keyWidth, '↓')

    this.add.text(this.gameSize.width * (6 / 8), keyY, '+', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    new KeyTutorial(this, this.gameSize.width * (7 / 8), keyY, '').setScale(2, 0.5)

    this.add.text(this.gameSize.width / 2, this.gameSize.height * (6 / 8), '(play)', {
      align: 'center',
      fill: 'white',
      fontFamily: 'sans-serif',
      fontSize: 48
    }).setOrigin(0.5, 0.5);

    this.add.text(this.gameSize.width / 2, this.gameSize.height * (6 / 8) + 50, 'Click to Start!', { fontSize: '30px', fill: '#ffffff' }).setOrigin(0.5, 0.5);


    this.input.on('pointerup', () => {
      this.startGame()
    });

    // define keys
    window.keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    window.keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    window.keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    window.keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    window.keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    window.keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
  }

  startGame() {
    this.scene.stop('menuScene')
    this.scene.start('playScene')
  }

  update() {
    if (keySPACE.isDown) {
      this.startGame()
    }
    if (keyLEFT.isDown) {
      this.startGame()
    }
    if (keyRIGHT.isDown) {
      this.startGame()
    }
    if (keyUP.isDown) {
      this.startGame()
    }
    if (keyDOWN.isDown) {
      this.startGame()
    }
  }
}
