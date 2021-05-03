import Phaser from 'phaser'


import images_menu_bg from 'url:/assets/menu.png';
import images_key_bg from 'url:/assets/Key_BG.png';
import move_mouse_img from 'url:/assets/cursor_graphicks1.png'
import click_mouse_img from 'url:/assets/cursor_graphicks2.png'


import images_shark from 'url:/assets/shark.png';
import images_stone_crash from 'url:/assets/stone_crash.png';
import images_coconut_crash from 'url:/assets/coconut_crash.png';
import images_wood_crash from 'url:/assets/wood_crash.png';
import images_boat from 'url:/assets/boat_anim.png';
import images_wave from 'url:/assets/wave_foreground.png';
import images_wave_bg from 'url:/assets/wave_bg.png';
import images_surfer from 'url:/assets/surfer_sm.png'
import images_ocean_tile from 'url:/assets/ocean_tile.png';

import sounds_hit_sound from 'url:/assets/collision.wav';
import sounds_death_sound_1 from 'url:/assets/deathsound1.wav';
import sounds_death_sound_2 from 'url:/assets/deathsound2.wav';
import sounds_idle_sound_1 from 'url:/assets/idlesound1.wav';
import sounds_idle_sound_2 from 'url:/assets/idlesound2.wav';
import sounds_idle_sound_3 from 'url:/assets/idlesound1.wav';
import sounds_idle_sound_4 from 'url:/assets/idlesound2.wav';
import sounds_soundtrack from 'url:/assets/DIE_RAD_wip1.wav';
import sounds_waves from 'url:/assets/wavesloop.wav'

export default class LoadingScene extends Phaser.Scene {
    constructor() {
      super({ key: 'loadingScene' });
    }

    preload() {
      // draw the loading bar
      var loading_bar_background = this.add.rectangle(this.game.config.width / 2, this.game.config.height / 2, 400, 30, 0x666666).setOrigin(0.5, 0.5);
      var loading_bar = this.add.rectangle(loading_bar_background.x, loading_bar_background.y, loading_bar_background.width, loading_bar_background.height, 0xffffff).setScale(0, 1).setOrigin(0.5, 0.5);

      this.load.image('key_bg', images_key_bg);
      this.load.image('menu_bg', images_menu_bg);
      this.load.image('move_mouse_tutorial', move_mouse_img)
      this.load.image('click_mouse_tutorial', click_mouse_img)

      this.load.image('wave_foreground', images_wave);// { frameWidth: 64, frameHeight: 4, startFrame: 0, endFrame: 9 };
      this.load.image('wave_background', images_wave_bg);
      this.load.image('ocean_tile', images_ocean_tile);

      // Obstacle Images:
      this.load.spritesheet('shark', images_shark,
        { frameWidth: 128, frameHeight: 71, startFrame: 0, endFrame: 2 });
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
      this.load.audio('death_sound_1', sounds_death_sound_1)
      this.load.audio('death_sound_2', sounds_death_sound_2)
      this.load.audio('idle_sound_1', sounds_idle_sound_1)
      this.load.audio('idle_sound_2', sounds_idle_sound_2)
      this.load.audio('idle_sound_3', sounds_idle_sound_3)
      this.load.audio('idle_sound_4', sounds_idle_sound_4)
      this.load.audio('hit_sound', sounds_hit_sound)
      this.load.audio('wave_sound', sounds_waves);

      this.load.audio('soundtrack', sounds_soundtrack);

      this.load.on('progress', function (progress) {
        loading_bar.setScale(progress, 1);
      });
    }

    update() {
      this.scene.start('menuScene');
      // this.scene.start('playScene');
      this.scene.remove();
    }
  }