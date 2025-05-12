import Goblin from './Goblin.js';
import Score from './Score.js';

export default class Game {
  constructor() {
    this.boardSize = 4;
    this.missed = 0;
    this.maxMissed = 5;
    this.cells = [];
    this.goblin = new Goblin();
    this.score = new Score();
    this.timer = null;
  }

  init() {
    this.createBoard();
    this.startGame();
  }

  createBoard() {
    const app = document.getElementById('app');
    const board = document.createElement('div');
    board.className = 'board';

    for (let i = 0; i < this.boardSize * this.boardSize; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      cell.addEventListener('click', () => this.handleClick(i));
      board.appendChild(cell);
      this.cells.push(cell);
    }

    app.appendChild(board);
  }

  startGame() {
    this.timer = setInterval(() => {
      this.moveGoblin();
      this.missed++;
      if (this.missed >= this.maxMissed) {
        this.endGame();
      }
    }, 1000);
  }

  moveGoblin() {
    let newPosition;
    do {
      newPosition = Math.floor(Math.random() * this.boardSize * this.boardSize);
    } while (newPosition === this.goblin.currentPosition);

    this.goblin.moveTo(this.cells[newPosition]);
    this.goblin.currentPosition = newPosition;
  }

  handleClick(index) {
    if (index === this.goblin.currentPosition) {
      this.score.increase();
      this.goblin.hide();
      this.missed = 0;
    }
  }

  endGame() {
    clearInterval(this.timer);
    alert(`Игра окончена! Ваш рекорд: ${this.score.value}`);
  }
}