import './styles.css';
import goblinImage from './assets/gnome.png';
import hammerCursor from './assets/hammer.png';

class Goblin {
  constructor() {
    this.element = document.createElement('img');
    this.element.src = goblinImage;
    this.element.className = 'goblin';
    this.currentPosition = null;
  }

  showInCell(cell) {
    cell.appendChild(this.element);
    this.currentPosition = parseInt(cell.dataset.index);
  }

  hide() {
    if (this.element.parentElement) {
      this.element.parentElement.removeChild(this.element);
    }
    this.currentPosition = null;
  }
}

class Score {
  constructor() {
    this.value = 0;
    this.missed = 0;
    this.maxMissed = 5;
    this.element = document.createElement('div');
    this.element.className = 'score';
    this.updateDisplay();
  }

  increase() {
    this.value++;
    this.updateDisplay();
  }

  miss() {
    this.missed++;
    this.updateDisplay();
    return this.missed >= this.maxMissed;
  }

  reset() {
    this.value = 0;
    this.missed = 0;
    this.updateDisplay();
  }

  updateDisplay() {
    this.element.textContent = `Попаданий: ${this.value} | Пропущено: ${this.missed}/${this.maxMissed}`;
  }
}

class GameBoard {
  constructor(size = 4) {
    this.size = size;
    this.cells = [];
    this.createBoard();
    this.setCustomCursor(hammerCursor);
  }

  createBoard() {
    const app = document.getElementById('app');
    app.innerHTML = ''; // Очищаем предыдущее состояние

    // Создаем контейнер для элементов управления
    const controls = document.createElement('div');
    controls.className = 'controls';

    // Создаем кнопку "Начать заново"
    this.restartButton = document.createElement('button');
    this.restartButton.textContent = 'Начать заново';
    this.restartButton.className = 'restart-button';
    controls.appendChild(this.restartButton);

    // Добавляем счет
    this.score = new Score();
    controls.appendChild(this.score.element);

    app.appendChild(controls);

    // Создаем игровое поле
    const board = document.createElement('div');
    board.className = 'board';

    for (let i = 0; i < this.size * this.size; i++) {
      const cell = document.createElement('div');
      cell.className = 'cell';
      cell.dataset.index = i;
      board.appendChild(cell);
      this.cells.push(cell);
    }

    app.appendChild(board);
  }

  setCustomCursor(cursorImage) {
    document.body.style.cursor = `url(${cursorImage}) 35 35, auto`;
  }

  getRandomCell(excludeIndex = null) {
    let availableCells = this.cells;
    if (excludeIndex !== null) {
      availableCells = this.cells.filter((_, index) => index !== excludeIndex);
    }
    return availableCells[Math.floor(Math.random() * availableCells.length)];
  }
}

class Game {
  constructor() {
    this.board = new GameBoard();
    this.goblin = new Goblin();
    this.score = this.board.score;
    this.gameInterval = null;
    this.initGame();
  }

  initGame() {
    this.cells = document.querySelectorAll('.cell');
    this.addCellClickHandlers();
    
    // Добавляем обработчик для кнопки "Начать заново"
    document.querySelector('.restart-button').addEventListener('click', () => {
      this.restartGame();
    });
    
    this.startGame();
  }

  addCellClickHandlers() {
    this.cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (parseInt(cell.dataset.index) === this.goblin.currentPosition) {
          this.score.increase();
          this.goblin.hide();
        }
      });
    });
  }

  startGame() {
    this.gameInterval = setInterval(() => {
      if (this.goblin.currentPosition !== null) {
        if (this.score.miss()) {
          this.endGame();
          return;
        }
      }
      
      const nextCell = this.board.getRandomCell(this.goblin.currentPosition);
      this.goblin.showInCell(nextCell);
    }, 1000);
  }

  endGame() {
    clearInterval(this.gameInterval);
    setTimeout(() => {
      alert(`Игра окончена! Ваш результат: ${this.score.value} попаданий`);
    }, 100);
  }

  restartGame() {
    clearInterval(this.gameInterval);
    this.goblin.hide();
    this.score.reset();
    this.startGame();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Game();
});