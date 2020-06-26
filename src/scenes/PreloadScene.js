import 'phaser';

// eslint-disable-next-line no-undef
export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(100, 150, 200, 20);

    const { width } = this.cameras.main;
    const { height } = this.cameras.main;
    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 + 100,
      text: 'Loading...',
      style: {
        font: '10px Dragon',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {
        font: '10px Dragon',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '10px Dragon',
        fill: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', (value) => {
      // eslint-disable-next-line radix
      percentText.setText(`${parseInt(value * 100)}%`);
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(100, 150, 200 * value, 15);
    });

    this.load.on('fileprogress', (file) => {
      assetText.setText(`Loading asset: ${file.key}`);
    });

    this.load.on('complete', () => {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
      this.ready();
    });

    this.timedEvent = this.time.delayedCall(3000, this.ready, [], this);

    this.load.image('playButton', './src/assets/ui/Button.png');
    this.load.image('playButton2', './src/assets/ui/ButtonPressed.png');
    this.load.image('box', './src/assets/ui/Box.png');
    this.load.image('checkedBox', './src/assets/ui/CheckedBox.png');
    this.load.image('tiles', './src/assets/map/tileset.png');
    this.load.image('title', './src/assets/title.png');
    this.load.tilemapTiledJSON('map', './src/assets/map/map.json');
    this.load.audio('bgMusic', ['./src/assets/title.mp3']);
    this.load.spritesheet('player', './src/assets/adventurer.png', { frameWidth: 50, frameHeight: 37 });
    this.load.spritesheet('slime', './src/assets/slime.png', { frameWidth: 32, frameHeight: 25 });
    this.load.audio('swing1', ['./src/assets/swish1.wav']);
    this.load.audio('hitSlime', ['./src/assets/slime.wav']);
  }

  init() {
    this.readyCount = 0;
  }

  ready() {
    // eslint-disable-next-line no-plusplus
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Title');
    }
  }
}