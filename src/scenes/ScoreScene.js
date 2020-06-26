/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */
import 'phaser';
import { getScore } from '../scoreSystem';

// eslint-disable-next-line no-undef
export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Scores');
  }

  create() {
    getScore().then(data => {
      this.scoresArray = Object.entries(data.result).sort((a, b) => {
        if (b[1].score > a[1].score) return 1;
        if (b[1].score < a[1].score) return -1;
        return 0;
      });
      this.menuButton = this.add.sprite(200, 300, 'playButton').setInteractive();
      this.menuText = this.add.text(0, 0, 'Title', { font: '10px Dragon', fill: '#fff' });

      this.menuButton.setScale(0.4, 0.4);

      Phaser.Display.Align.In.Center(this.menuText, this.menuButton);

      this.menuButton.on('pointerdown', (pointer) => {
        this.scene.start('Title');
      });

      this.menuButton.on('pointerover', (pointer) => {
        this.menuButton.setTexture('playButton2');
      });

      this.menuButton.on('pointerout', (pointer) => {
        this.menuButton.setTexture('playButton');
      });
      this.add.text(150, 30, 'HighScores', { font: '16px Dragon' });
      for (let i = 0; i < 10; i++) {
        this.add.text(100, ((i + 1) * 20) + 50, `${i + 1}.-  ${this.scoresArray[i][1].user}`, { font: '10px Dragon' });
        this.add.text(225, ((i + 1) * 20) + 50, `Points: ${this.scoresArray[i][1].score}`, { font: '10px Dragon' });
      }
    });
  }
}