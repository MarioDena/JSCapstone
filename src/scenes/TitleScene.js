import "phaser";
import config from '../config/config';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super("Title");
  }

  preload() {}

  centerButton (gameObject, offset = 0) {
    
    Phaser.Display.Align.In.Center(
      gameObject,
      this.add.zone(config.width/2, config.height/2 - offset * 100, config.width, config.height)
    );
  }

  create() {
    this.gameButton = this.add.sprite(100, 200, "playButton").setInteractive();
    this.centerButton(this.gameButton, -2);
    this.gameButton.setScale(1,0.5);
    this.gameButton.on(
      "pointerdown",
      function (pointer) {
        this.scene.start("Game");
      }.bind(this)
    );

    this.input.on("pointerover", function (event, gameObjects) {
      gameObjects[0].setTexture("playButton2");
    });

    this.input.on("pointerout", function (event, gameObjects) {
      gameObjects[0].setTexture("playButton");
    });
  }
}
