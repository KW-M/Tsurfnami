
window.targetFPS = 10;

// reserve vars
let game, gameWidth = window.innerWidth, gameHeight = window.innerHeight, keySPACE, keyR, keyLEFT, keyRIGHT, keyUP, keyDOWN;

const DEFAULT_WIDTH = 1024
const DEFAULT_HEIGHT = 576
const MAX_WIDTH = 1536
const MAX_HEIGHT = 864
let SCALE_MODE = 'SMOOTH' // FIT OR SMOOTH


let gameConfig = {
  type: Phaser.AUTO,
  autoRound: true,
  fps: {
    target: targetFPS,
    forceSetTimeOut: true,
  },
  scale: {
    zoom: 2,
    mode: Phaser.Scale.NONE, // we do scale the game manually in resize()
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {},
      debug: false
      // debug: {
      //     showBody: true,
      //     showStaticBody: true
      // }
    }
    //     default: 'matter',
    //     matter: {
    //         enableSleeping: true,
    //         gravity: {
    //             y: 0
    //         },
    // }
  },
  scene: [LoadingScene, MenuScene, PlayScene]// EndScene
}

window.addEventListener('load', () => {
  game = new Phaser.Game(gameConfig)

  function resize() { // This code comes from https://github.com/yandeu/phaser3-scaling-resizing-example
    const w = window.innerWidth
    const h = window.innerHeight

    let width = DEFAULT_WIDTH
    let height = DEFAULT_HEIGHT
    // let maxWidth = MAX_WIDTH
    // let maxHeight = MAX_HEIGHT
    // let scaleMode = SCALE_MODE

    let scale = Math.min(w / DEFAULT_WIDTH, h / DEFAULT_HEIGHT)
    let newWidth = w / scale;
    let newHeight = h / scale;

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

  // Debouncing means dn't call the function (resize()) untill resizing has stopped for some time
  let resizeDebounceTimeout
  window.addEventListener('resize', event => {
    // clear the timeout
    clearTimeout(resizeDebounceTimeout);
    // start timing for event "completion"
    resizeDebounceTimeout = setTimeout(resize, 50);
  })
  resize()
})