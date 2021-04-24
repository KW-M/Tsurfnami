class ScoreOverlay extends Phaser.GameObjects.Sprite {
    constructor(scene) {
        super(scene, 0, 0, "wave");
        scene.add.existing(this);   // add to existing scene

        // create a game clock that will count up.
        this.clock = 0;
    }

    create(){
        // create an object to populate the text configuration members
        let textConfig = {
            fontFamily: "Courier",
            fontSize: "20px",
            backgroundColor: "#f3b141",
            color: "#843605",
            align: "left",
            padding: { top: 5, bottom: 5 },
            fixedWidth: 140
        };

        // add the text to the screen
        this.clockText = this.scene.add.text(
            3, // x-coord
            3, // y-coord
            this.formatTime(this.clock), // text to display
            textConfig // text style config object
        );

        // add the event to increment the clock;
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.clock += 1000;
                this.clockText.text = this.formatTime(this.clock);
            },
            scope: this,
            loop: true
        });

        this.doomText = this.scene.add.text(
            150,
            3,
            "DOOM: 0",
            textConfig
        )
    }

    setDoomLevel(doomLevel) {
        this.doomText.text = "DOOM: " + doomLevel
    }

    // FORMAT TIME function
    formatTime(ms) {
        console.log(ms)
        let s = ms / 1000;
        let min = Math.floor(s / 60);
        let seconds = s % 60;
        seconds = seconds.toString().padStart(2, "0");
        return `${min}:${seconds}`;
    };


}