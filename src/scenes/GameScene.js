/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-unused-vars */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'phaser';
import { submitScore, getScore } from '../scoreSystem';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  wake() {
    this.model = this.sys.game.globals.model;
    this.score = 0;
    this.hitting = true;
    this.damageCalc = false;
    this.playingSound = false;
    this.player.setPosition(110, 238);
    this.player.body.offset.x = 0;
    this.player.setScale(1, 1);
    this.player.body.facing = 14;
    this.player.setFrame(1);
  }

  showPauseMenu(show) {
    this.scoreText.setVisible(show);
    this.nameInput.setVisible(show);
    if (show === true) {
      this.sendButton.setInteractive();
    } else {
      this.sendButton.disableInteractive();
    }
    this.sendButton.setVisible(show);
    this.sendText.setVisible(show);
  }

  createMenu() {
    const style = 'font: 10px Dragon; color: white';
    this.scoreText = this.add.dom(120, 40, 'h2', `${style}`, 'Please enter your name to submit your score').setDisplayOrigin(50, -30).setDepth(1).setVisible(false);
    const inputBar = document.createElement('div');
    inputBar.innerHTML = `
            <input type="text" id="input" placeholder="MyName" style="width: 200px;  height: 20px; padding: 3px; text-align: center; border: 1px black solid; font: 12px Dragon; background-color: white;">
         `;
    const inputStyle = 'width: 200px; text-align: center';
    this.nameInput = this.add.dom(250, 220, inputBar, `${inputStyle}`).setDisplayOrigin(150, 110).setVisible(false);
    this.sendButton = this.add.sprite(200, 150, 'playButton').disableInteractive();
    this.sendText = this.add.text(0, 0, 'Submit', { font: '10px Dragon', fill: '#fff' }).setVisible(false);

    this.sendButton.setScale(0.4, 0.4);

    this.sendButton.on('pointerover', (pointer) => {
      this.sendButton.setTexture('playButton2');
    });

    this.sendButton.on('pointerout', (pointer) => {
      this.sendButton.setTexture('playButton');
    });

    this.sendButton.on('pointerup', (pointer) => {
      const inputValue = document.getElementById('input').value;
      if (inputValue === '') {
        submitScore('NoName', this.score).then(data => {
          this.model.isPaused = false;
          this.showPauseMenu(this.model.isPaused);
          this.scene.sleep('Game');
          this.scene.switch('Scores');
        });
      } else {
        submitScore(inputValue, this.score).then(data => {
          this.model.isPaused = false;
          this.showPauseMenu(this.model.isPaused);
          this.scene.sleep('Game');
          this.scene.switch('Scores');
        });
      }
    });

    Phaser.Display.Align.In.Center(this.sendText, this.sendButton);
    this.sendButton.setVisible(false);
  }

  createFloatingText(x, y, message, tint) {
    const animation = this.add.text(x, y, message, { font: '10px Dragon' }).setTint(tint);

    this.add.tween({

      targets: animation,
      duration: 750,
      ease: 'Exponential.In',
      y: y - 30,

      onComplete: () => {
        animation.destroy();
      },
      callbackScope: this,

    });
  }

  checkOverlap(spriteA, spriteB) {
    const boundsA = spriteA.getBounds();
    const boundsB = spriteB.getBounds();

    return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.model.isPaused = false;
    this.score = 0;
    this.playingSound = false;
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('background', 'tiles');
    const background = map.createStaticLayer('Map', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);
    this.hitting = true;
    this.damageCalc = false;
    this.createMenu();

    this.textScore = this.add.text(170, 50, `Score ${this.score}`, { font: '10px Dragon' });
    this.camera = this.cameras.main.setBounds(0, 0, 400, 320);


    this.slime = this.physics.add.sprite(140, 244, 'slime', 1);
    this.player = this.physics.add.sprite(110, 238, 'player', 1);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.pause = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

    this.anims.create({
      key: 'iddle',
      frames: this.anims.generateFrameNumbers('player', { frames: [0, 1, 2, 3] }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [8, 9, 10, 11, 12, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [8, 9, 10, 11, 12, 13] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'attack',
      frames: this.anims.generateFrameNumbers('player', { frames: [42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58] }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'iddleEn',
      frames: this.anims.generateFrameNumbers('slime', { frames: [0, 1, 2, 3] }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'hittingEn',
      frames: this.anims.generateFrameNumbers('slime', { frames: [18, 17] }),
      frameRate: 3,
      repeat: -1,
    });

    this.physics.add.collider(this.player, obstacles);
    this.player.body.facing = 14;
    this.model.isPaused = false;
    this.pause.on('down', (event) => { this.model.isPaused = !this.model.isPaused; this.showPauseMenu(this.model.isPaused); });
    this.sys.events.on('wake', this.wake, this);
  }

  update(time, delta) {
    this.player.body.setVelocity(0);
    this.textScore.setText(`Score ${this.score}`);

    if (this.model.isPaused === false) {
      if (this.hitting === true) {
        this.hitting = false;
      }

      if (this.checkOverlap(this.slime, this.player) && this.spaceBar.isDown) {
        if ((this.player.x - this.slime.x) > 6 && (this.player.x - this.slime.x) < 31) {
          if (this.player.body.facing === 13) {
            this.hitting = true;
          }
        } else if ((this.player.x - this.slime.x) < -6 && (this.player.x - this.slime.x) > -31) {
          if (this.player.body.facing === 14) {
            this.hitting = true;
          }
        }
      }

      if (this.cursors.left.isDown) {
        this.player.body.offset.x = 50;
        this.player.setScale(-1, 1);
        this.player.body.setVelocityX(-80);
        this.player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
        this.player.body.offset.x = 0;
        this.player.setScale(1, 1);
        this.player.body.setVelocityX(80);
        this.player.anims.play('right', true);
      } else if (this.spaceBar.isDown) {
        this.player.anims.play('attack', true);
        if (this.player.body.facing === 13 && this.player.anims.currentFrame.index === 14) {
          this.player.body.setVelocityX(-80);
        } else if (this.player.body.facing === 14 && this.player.anims.currentFrame.index === 14) {
          this.player.body.setVelocityX(80);
        }
        if (this.player.anims.currentFrame.index === 3 || this.player.anims.currentFrame.index === 9 || this.player.anims.currentFrame.index === 14) {
          if (this.playingSound === false) {
            this.playingSound = true;
            this.sound.play('swing1', { volume: 0.4 });
          }
        } else {
          this.playingSound = false;
        }

        if (this.player.anims.currentFrame.index === 3 || this.player.anims.currentFrame.index === 9 || this.player.anims.currentFrame.index === 14) {
          if (this.hitting === true) {
            this.slime.anims.play('hittingEn');
            if (this.damageCalc === false) {
              this.damageCalc = true;
              this.sound.play('hitSlime', { volume: 0.2, pitch: 3 });
              this.score += 10;
              this.createFloatingText(this.slime.x - 5, this.slime.y - 5, '10', 0xffff00);
            }
          }
        } else {
          this.damageCalc = false;
          this.slime.anims.play('iddleEn', true);
        }
      } else {
        this.player.anims.play('iddle', true);
        this.slime.anims.play('iddleEn', true);
      }
    } else {
      this.player.anims.play('iddle', true);
      this.slime.anims.play('iddleEn', true);
    }
  }
}