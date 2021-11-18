'use strict';

let positions = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

const player1Score = document.querySelector('#score--0');
const player2Score = document.querySelector('#score--1');
const btnNew = document.querySelector('.btn--new');
const td = document.querySelectorAll('.td');
const player1Section = document.querySelector('#section-1');
const player2Section = document.querySelector('#section-2');
const modal = document.querySelector('.modal');
const btnCloseModal = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const message = document.querySelector('.message');

const getActivePlayer = function () {
  return player1Section.classList.contains('player--active')
    ? 'cross'
    : 'circle';
};

const insertImage = function (a) {
  const img = document.createElement('img');
  img.src = `source-${getActivePlayer()}.png`;
  img.setAttribute('width', '80%');
  img.setAttribute('height', '80%');
  img.style.display = 'block';
  img.style.margin = '0 auto';
  a.appendChild(img);
};

const switchPlayer = function (a) {
  if (a === 'cross') {
    player1Section.classList.remove('player--active');
    player2Section.classList.add('player--active');
  } else {
    player2Section.classList.remove('player--active');
    player1Section.classList.add('player--active');
  }
};

const checkWinner = function () {
  for (let i = 0; i < 3; i++) {
    if (
      positions[0][i] &&
      positions[1][i] &&
      positions[2][i] &&
      positions[0][i] === positions[1][i] &&
      positions[0][i] === positions[2][i] &&
      positions[1][i] === positions[2][i]
    ) {
      return getActivePlayer() === 'cross' ? 1 : 2;
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      positions[i][0] &&
      positions[i][1] &&
      positions[i][2] &&
      positions[i][0] === positions[i][1] &&
      positions[i][0] === positions[i][2] &&
      positions[i][1] === positions[i][2]
    ) {
      return getActivePlayer() === 'cross' ? 1 : 2;
    }
  }

  if (
    positions[0][0] &&
    positions[1][1] &&
    positions[2][2] &&
    positions[0][0] === positions[1][1] &&
    positions[0][0] === positions[2][2] &&
    positions[1][1] === positions[2][2]
  ) {
    return getActivePlayer() === 'cross' ? 1 : 2;
  }

  if (
    positions[0][2] &&
    positions[1][1] &&
    positions[2][0] &&
    positions[0][2] === positions[1][1] &&
    positions[0][2] === positions[2][0] &&
    positions[1][1] === positions[2][0]
  ) {
    return getActivePlayer() === 'cross' ? 1 : 2;
  }

  return 0;
};

const checkPositions = function () {
  let bool = true;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      bool = bool && Boolean(positions[i][j]);
    }
  }

  return bool;
};

const nextRound = function () {
  positions = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  for (let i = 0; i < td.length; i++) {
    if (td[i].childNodes.length) {
      td[i].innerHTML = '';
    }
  }

  if (getActivePlayer() !== 'cross') switchPlayer('circle');
};

const newGame = function () {
  nextRound();
  player1Score.textContent = '0';
  player2Score.textContent = '0';
};

const openModal = function (a) {
  modal.classList.add(a === 1 ? 'next' : 'new');
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  if (modal.classList.contains('next')) {
    modal.classList.remove('next');
    nextRound();
  } else {
    modal.classList.remove('new');
    newGame();
  }
};

btnCloseModal.addEventListener('click', function () {
  closeModal();
});

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'Escape' &&
    !modal.classList.contains('hidden') &&
    !overlay.classList.contains('hidden')
  ) {
    closeModal();
  }
});

const setMessage = function (msg) {
  message.textContent = msg;
};

for (let i = 0; i < td.length; i++) {
  td[i].addEventListener('click', function () {
    if (!td[i].childNodes.length) {
      insertImage(td[i]);
      positions[Math.floor(i / 3)][i % 3] =
        getActivePlayer() === 'cross' ? 1 : 2;
      if (!checkWinner() && checkPositions()) {
        setMessage(
          `Draw! Current score: ${player1Score.textContent}-${player2Score.textContent}`
        );
        openModal(1);
      } else if (!checkWinner() && !checkPositions()) {
        switchPlayer(getActivePlayer());
      } else if (checkWinner() === 1) {
        player1Score.textContent = Number(player1Score.textContent) + 1;
        if (Number(player1Score.textContent) === 5) {
          setMessage(
            `Player 1 wins game: ${player1Score.textContent}-${player2Score.textContent}. Starting new game...`
          );
          openModal(2);
        } else {
          setMessage(
            `Player 1 wins round! Current score: ${player1Score.textContent}-${player2Score.textContent}`
          );
          openModal(1);
        }
      } else if (checkWinner() === 2) {
        player2Score.textContent = Number(player2Score.textContent) + 1;
        if (Number(player2Score.textContent) === 5) {
          setMessage(
            `Player 2 wins game: ${player1Score.textContent}-${player2Score.textContent}. Starting new game...`
          );
          openModal(2);
        } else {
          setMessage(
            `Player 2 wins round! Current score: ${player1Score.textContent}-${player2Score.textContent}`
          );
          openModal(1);
        }
      }
    }
  });
}

btnNew.addEventListener('click', function () {
  newGame();
});
