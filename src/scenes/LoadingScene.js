class LoadingScene extends Phaser.Scene {
    constructor() {
      super({ key: 'loadingScene' });
    }

    preload() {
      var bg = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
      var bar = this.add.rectangle(bg.x, bg.y, bg.width, bg.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

      this.load.image('wave', './assets/waves_anim.png');// { frameWidth: 64, frameHeight: 4, startFrame: 0, endFrame: 9 };
      this.load.image('wave_background', './assets/ocean_gradient.png');// { frameWidth: 64, frameHeight: 4, startFrame: 0, endFrame: 9 };
      this.load.image('ocean_tile', './assets/ocean_tile.png');
      this.load.image('starfield', './assets/starfield.png');
      this.load.image('surfer', './assets/surfboard.png');
      this.load.image('rocket','./assets/rocket.png',);
      this.load.image('spaceshipfast','./assets/spaceship fast.png',);

      // load spritesheets
      this.load.spritesheet('spaceship','./assets/spaceship.png',
      {frameWidth: 63, frameHeight: 46, startFrame: 0, endFrame: 4});
      this.load.spritesheet('explosion', './assets/explosion.png',
      {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 6});
      this.load.spritesheet('manta', './assets/manta_anim.png',
      { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 10 });
      this.load.spritesheet('boat', './assets/boat_anim.png',
      { frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 9 });

      // this.load.audio('sfx_explosion', sounds_explosion38);
      // this.load.audio('sfx_rocket', sounds_rocket_shot);
      this.load.audio('soundtrack', './assets/The_Spyprobe_-_Oceanforms.mp3');

      this.load.on('progress', function (progress) {
        bar.setScale(progress, 1);
      });
    }

    update() {
      // this.scene.start('menuScene');
      this.scene.start('playScene');
      this.scene.remove();
    }
  }