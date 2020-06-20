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
    const tiles = map.addTilesetImage('backgound', 'tiles');

    const grass = map.createStaticLayer('Background', tiles, 0, 0);
    const obstacles = map.createStaticLayer('Obstables', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);


    this.camera = this.cameras.main.setBounds(0, 0, 400, 320);
  }
}
