/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import GameScene from '../scenes/GameScene';
import BootScene from '../scenes/BootScene';
import PreloaderScene from '../scenes/PreloadScene';
import TitleScene from '../scenes/TitleScene';
import ScoreScene from '../scenes/ScoreScene';
import OptionsScene from '../scenes/OptionsScene';


export const gameTestingSuite = () => {
  const config = {
    type: Phaser.AUTO,
    width: 400,
    height: 320,
    zoom: 2,
    pixelArt: true,
    parent: 'parent',
    dom: {
      createContainer: true,
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
      },
    },
    scene: [
      GameScene,
      BootScene,
      PreloaderScene,
      TitleScene,
      ScoreScene,
      OptionsScene,
    ],
  };
  return new Phaser.Game(config);
};