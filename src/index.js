import 'phaser';
import config from './config/config';
import Model from './Model';
import GameScene from './scenes/GameScene';
import BootScene from './scenes/BootScene';
import PreloaderScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';
import ScoreScene from './scenes/ScoreScene';
import OptionsScene from './scenes/OptionsScene';

// eslint-disable-next-line no-undef
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Scores', ScoreScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Options', OptionsScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();