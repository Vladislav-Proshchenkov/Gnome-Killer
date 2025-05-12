export default class Goblin {
    constructor() {
      this.element = document.createElement('img');
      this.element.src = './assets/goblin.png';
      this.element.className = 'goblin';
      this.currentPosition = null;
    }
  
    moveTo(cell) {
      cell.appendChild(this.element);
    }
  
    hide() {
      if (this.element.parentElement) {
        this.element.parentElement.removeChild(this.element);
      }
    }
  }