/* eslint-disable no-underscore-dangle */
export default class Model {
  constructor() {
    this._soundOn = true;
    this._musicOn = true;
    this._bgMusicPlaying = false;
    this._isPaused = false;
    this._APIkey = 'zmZyqIbOlf6ZyQzDGy6I';
  }


  get APIkey() {
    return this._APIkey;
  }

  set isPaused(value) {
    this._overlap = value;
  }

  get isPaused() {
    return this._overlap;
  }

  set musicOn(value) {
    this._musicOn = value;
  }

  get musicOn() {
    return this._musicOn;
  }

  set soundOn(value) {
    this._soundOn = value;
  }

  get soundOn() {
    return this._soundOn;
  }

  set bgMusicPlaying(value) {
    this._bgMusicPlaying = value;
  }

  get bgMusicPlaying() {
    return this._bgMusicPlaying;
  }
}