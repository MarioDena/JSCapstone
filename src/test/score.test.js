import * as scoreAPI from '../scoreSystem';
import '@babel/polyfill';

describe('It test the score API.', () => {
  test('the submit POST action works', () => {
    scoreAPI.submitScore('MarioDENA', 100)
      .then(data => { expect(data).toBe('Leaderboard score created correctly.'); })
      .then(data => data).catch(() => 'Something went wrong');
  });

  test('obtain GET data', () => {
    scoreAPI.getScore()
      .then(data => { expect(data[1].user).toBe('Brandy'); })
      .then(data => data).catch(() => 'Something went wrong');
  });

  test('GET data for scores', () => {
    scoreAPI.getScore()
      .then(data => { expect(data[0].user).toBe(600); })
      .then(data => data).catch(() => 'Something went wrong');
  });
});