export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
  }

        create() {

          // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);


            // menu text configuration
        let menuConfig = {
            fontFamily: 'Zen Dots',
            fontSize: '25px',
            backgroundColor: '#FF0000',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }

          //show menu text
          let centerX = game.config.width/2;
          let centerY = game.config.height/2;
          let textSpacer = 64;
          this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
          //--------------
          menuConfig.backgroundColor = '#FF9900';
          menuConfig.color = '#000';
          this.add.text(centerX, centerY, 'Use <--> arrows to move and F to Fire', menuConfig).setOrigin(0.5);
          //-------------
          menuConfig.backgroundColor = '#00FF00';
          menuConfig.color = '#000';
          this.add.text(centerX, centerY + textSpacer, 'Or Move with mouse and LEFT Click to fire', menuConfig).setOrigin(0.5);
          //-------------
          menuConfig.backgroundColor = '#3DBAFF';
          menuConfig.color = "#FFF";
          this.add.text(centerX, centerY + (2 * textSpacer), 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        // define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        }

        update() {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
              // easy mode
              game.settings = {
                shipSpeed: 2,
                gameTimer: 6000
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
              // hard mode
              game.settings = {
                shipSpeed: 4,
                gameTimer: 4000
              }
              this.sound.play('sfx_select');
              this.scene.start('playScene');
            }
          }
}