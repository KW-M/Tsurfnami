
import Phaser from 'phaser';
import LoadingScene from "/src/scenes/loadingScene"
import MenuScene from "/src/scenes/MenuScene"
import PlayScene from "/src/scenes/PlayScene"

// reserve vars
let game, keySPACE, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

const targetFPS = 20;

let gameConfig = {
  type: Phaser.AUTO,
  autoRound: true,
  fps: {
    target: targetFPS,
    forceSetTimeOut: true,
  },
  scale: {
    // zoom: 2,
    mode: Phaser.Scale.RESIZE,// Phaser.Scale.NONE, // we scale the game manually in resize()
    // width: window.innerWidth,
    // height: window.innerHeight
  },
  physics: {
    default: 'matter',
    matter: {
      enableSleeping: true,
      gravity: { y: 0 },
      // debug: {
      //   // showBody: true,
      //   // showStaticBody: true
      // }
    }
  },
  scene: [LoadingScene, MenuScene, PlayScene]// EndScene
}

function newGame() {
  if (game) return;
  game = new Phaser.Game(gameConfig);
}

// When the window has loaded fully, make the phaser game:
window.onload = () => {
  if (!game) newGame();
}

// This is for Parcel shenannagans that make reloading the website faster durring development.
function destroyGame() {
  if (!game) return;
  game.destroy(true);
  game.runDestroy();
  game = null;
}
if (module.hot) {
  module.hot.dispose(destroyGame);
  module.hot.accept(newGame);
}

