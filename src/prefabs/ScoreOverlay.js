import Phaser from 'phaser'

export default class ScoreOverlay extends Phaser.GameObjects.GameObject {
    constructor(scene) {
        super(scene);
        scene.add.existing(this);   // add to existing scene

        // create a game clock counter that will count up.
        this.clock = 0;

        this.doomLevel = 1;

        // create an object to populate the text configuration members
        let textConfig = {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#00b0ff85",
            color: "#FFFFFF",
            align: "left",
            padding: { top: 5, bottom: 5, left: 5, right: 5 },
        };

        // add the text to the screen
        this.clockText = this.scene.add.text(
            0, // x-coord
            0, // y-coord
            this.formatTime(this.clock), // text to display
            textConfig // text style config object
        );

        // add the event to increment the clock;
        this.timedEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                this.clock += 1000;
                this.clockText.text = this.formatTime(this.clock);
            },
            scope: this,
            loop: true
        });
        this.doomBar = this.scene.add.rectangle(60, 0, 1, 64, 'ff0000')
        this.doomText = this.scene.add.text(
            62,
            0,
            "DOOM: 0/100",
            textConfig
        )

        this.resize(this.scene.gameSize)
    }

    resize(gameSize) {
        let fullWidth = gameSize.width - 62;
        this.doomText.displayWidth = fullWidth
        this.doomBar.width = fullWidth * (this.doomLevel / 100)
    }

    incrementDoomLevel(doomLevelInc) {
        this.doomLevel += doomLevelInc;
        this.doomLevel = Phaser.Math.Clamp(this.doomLevel, 1, 100);
        this.doomText.text = "DOOM: " + Math.floor(this.doomLevel) + "/100"
        this.resize(this.scene.gameSize)
    }

    // FORMAT TIME function
    formatTime(ms) {
        let s = ms / 1000;
        let min = Math.floor(s / 60);
        let seconds = s % 60;
        seconds = seconds.toString().padStart(2, "0");
        return `${min}:${seconds}`;
    };


}