
import Phaser from 'phaser';
import LoadingScene from "/src/scenes/loadingScene"
import MenuScene from "/src/scenes/MenuScene"
import PlayScene from "/src/scenes/PlayScene"

// reserve vars
let game, keySPACE, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

const targetFPS = 10;

let gameConfig = {
  type: Phaser.AUTO,
  autoRound: true,
  fps: {
    target: targetFPS,
    forceSetTimeOut: true,
  },
  scale: {
    zoom: 2,
    mode: Phaser.Scale.NONE, // we scale the game manually in resize()
    width: window.innerWidth,
    height: window.innerHeight
  },
  physics: {
    default: 'matter',
    matter: {
      enableSleeping: true,
      gravity: { y: 0 },
      debug: {
        showBody: true,
        showStaticBody: true
      }
    }
  },
  scene: [LoadingScene, MenuScene, PlayScene]// EndScene
}

function newGame() {
  if (game) return;
  game = new Phaser.Game(gameConfig);

  // Handle when the window size changes:
  let resizeDebounceTimeout = null;
  window.addEventListener('resize', event => {
    // clear the debounce timeout
    // This implements super simple debouncing - Debouncing means only call the function (resize()) when resizing has stopped for some time (50ms).
    clearTimeout(resizeDebounceTimeout);
    // start timing for event "completion"
    resizeDebounceTimeout = setTimeout(resize, 50);
  })
  resize()
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

function resize() { // This code comes from https://github.com/yandeu/phaser3-scaling-resizing-example
  const w = window.innerWidth
  const h = window.innerHeight

  // let width = DEFAULT_WIDTH
  // let height = DEFAULT_HEIGHT
  // let maxWidth = MAX_WIDTH
  // let maxHeight = MAX_HEIGHT
  // let scaleMode = SCALE_MODE

  // let scale = Math.min(w / DEFAULT_WIDTH, h / DEFAULT_HEIGHT)
  let newWidth = w // / scale;
  let newHeight = h // / scale;

  // let defaultRatio = DEFAULT_WIDTH / DEFAULT_HEIGHT
  // let maxRatioWidth = MAX_WIDTH / DEFAULT_HEIGHT
  // let maxRatioHeight = DEFAULT_WIDTH / MAX_HEIGHT

  // // smooth scaling
  // let smooth = 1
  // if (scaleMode === 'SMOOTH') {
  //   const maxSmoothScale = 1.15
  //   const normalize = (value, min, max) => {
  //     return (value - min) / (max - min)
  //   }
  //   if (width / height < w / h) {
  //     smooth =
  //       -normalize(newWidth / newHeight, defaultRatio, maxRatioWidth) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
  //   } else {
  //     smooth =
  //       -normalize(newWidth / newHeight, defaultRatio, maxRatioHeight) / (1 / (maxSmoothScale - 1)) + maxSmoothScale
  //   }
  // }

  // resize the game
  game.scale.resize(newWidth, newHeight) // game.scale.resize(newWidth * smooth, newHeight * smooth)

  // scale the width and height of the css
  game.canvas.style.width = w + 'px'
  game.canvas.style.height = h + 'px'
}
