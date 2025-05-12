export default class Score {
    constructor() {
      this.value = 0;
      this.element = document.createElement('div');
      this.element.className = 'score';
      this.updateDisplay();
      document.getElementById('app').prepend(this.element);
    }
  
    increase() {
      this.value++;
      this.updateDisplay();
    }
  
    updateDisplay() {
      this.element.textContent = `Счёт: ${this.value}`;
    }
  }