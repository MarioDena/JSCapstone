import 'phaser';

// eslint-disable-next-line no-undef
export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  preload() {
  }

  create() {
    const map = this.make.tilemap({ key: 'map' });
    const tiles = map.addTilesetImage('background', 'tiles');

    // eslint-disable-next-line no-unused-vars
    const background = map.createStaticLayer('Map', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);


    this.camera = this.cameras.main.setBounds(0, 0, 400, 320);

    this.player = this.physics.add.sprite(110, 238, 'player', 1);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

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

    this.physics.add.collider(this.player, obstacles);

  }

  // eslint-disable-next-line no-unused-vars
  update(time, delta) {
    this.player.body.setVelocity(0);

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
    } else {
      this.player.anims.play('iddle', true);
    }
  }
}
