/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable radix */
/* eslint-disable import/prefer-default-export */
import '@babel/polyfill';


export async function submitScore(userName, scoreValue) {
  const data = { user: userName, score: parseInt(scoreValue) };
  const parameters = {
    method: 'POST', mode: 'cors', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  };
  const promise = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zmZyqIbOlf6ZyQzDGy6I/scores/', parameters);
  const confirm = await promise.json();
  return confirm;
}

export async function getScore() {
  const parameters = {
    method: 'GET', headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
  };
  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/zmZyqIbOlf6ZyQzDGy6I/scores/', parameters);
  const data = await response.json();
  return data;
}