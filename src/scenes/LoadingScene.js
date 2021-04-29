import Phaser from 'phaser'

import images_key_bg from 'url:/assets/Key_BG.png';
import images_stone_crash from 'url:/assets/stone_crash.png';
import images_coconut_crash from 'url:/assets/coconut_crash.png';
import images_wood_crash from 'url:/assets/wood_crash.png';
import images_explosion from 'url:/assets/explosion.png';
import images_rocket from 'url:/assets/rocket.png';
import images_mantaray from 'url:/assets/manta_anim.png';
import images_boat from 'url:/assets/boat_anim.png';
import images_wave from 'url:/assets/wave_foreground.png';
import images_wave_bg from 'url:/assets/wave_bg.png';
import images_surfer from 'url:/assets/surfer_sm.png'
import images_ocean_tile from 'url:/assets/ocean_tile.png';


import sounds_explosion38 from 'url:/assets/explosion38.wav';
import sounds_rocket_shot from 'url:/assets/rocket_shot.wav';
import sounds_soundtrack from 'url:/assets/The_Spyprobe_-_Oceanforms.mp3';

export default class LoadingScene extends Phaser.Scene {
    constructor() {
      super({ key: 'loadingScene' });
    }

    preload() {
      // draw the loading bar
      var loading_bar_background = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
      var loading_bar = this.add.rectangle(loading_bar_background.x, loading_bar_background.y, loading_bar_background.width, loading_bar_background.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

      this.load.image('key_bg', images_key_bg);
      this.load.image('wave_foreground', images_wave);// { frameWidth: 64, frameHeight: 4, startFrame: 0, endFrame: 9 };
      this.load.image('wave_background', images_wave_bg);
      this.load.image('ocean_tile', images_ocean_tile);

      // Obstacle Images:
      this.load.image('rocket', images_rocket);
      this.load.spritesheet('wood_crash', images_wood_crash,
        { frameWidth: 120, frameHeight: 120, startFrame: 0, endFrame: 5 });
      this.load.spritesheet('coconut_crash', images_coconut_crash,
        { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5 });
      this.load.spritesheet('stone_crash', images_stone_crash,
        { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 5 });
      this.load.spritesheet('boat', images_boat,
        { frameWidth: 64, frameHeight: 48, startFrame: 0, endFrame: 9 });

      this.load.spritesheet('surfer', images_surfer,
        { frameWidth: 160, frameHeight: 120, startFrame: 0, endFrame: 3 });

      // load spritesheets
      this.load.spritesheet('explosion', images_explosion,
      {frameWidth: 50, frameHeight: 50, startFrame: 0, endFrame: 6});
      this.load.spritesheet('manta', images_mantaray,
      { frameWidth: 64, frameHeight: 64, startFrame: 0, endFrame: 10 });


      this.load.audio('sfx_explosion', sounds_explosion38);
      this.load.audio('sfx_rocket', sounds_rocket_shot);
      this.load.audio('soundtrack', sounds_soundtrack);

      this.load.on('progress', function (progress) {
        loading_bar.setScale(progress, 1);
      });
    }

    update() {
      // this.scene.start('menuScene');
      this.scene.start('playScene');
      this.scene.remove();
    }
  }