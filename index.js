const $start = document.getElementById('btnEmpezar')
const $celeste = document.getElementById('celeste')
const $violeta = document.getElementById('violeta')
const $naranja = document.getElementById('naranja')
const $verde = document.getElementById('verde')
const LAST_LEVEL = 10

class Game {
  constructor() {
    this.initialize = this.initialize.bind(this)
    this.initialize()
    this.generatePattern()
    this.colors = [$celeste, $violeta, $naranja, $verde]

    setTimeout(this.nextLevel, 500)
  }
  
  initialize() {
    this.nextLevel = this.nextLevel.bind(this)
    this.chooseColor = this.chooseColor.bind(this)
    this.level = 1
    $start.classList.toggle('hide')
  }
  
  nextLevel() {
    this.subLevel = 0
    this.turnOnPattern()
    this.addClickEvents()
  }
  
  generatePattern() {
    this.pattern = new Array(LAST_LEVEL).fill(0).map(item => Math.floor(Math.random() * 4))
  }
  
  turnOnPattern() {
    for(let i = 0; i < this.level; i++) {
      setTimeout(() => this.turnOnColor(this.pattern[i]), 1000 * i)
    }
  }

  turnOnColor(color) {
    this.colors[color].classList.add('light')

    setTimeout(() => this.turnOffColor(color), 500)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light')
  }
  
  chooseColor(ev) {
    const clickedColor = ev.target.dataset.color
    this.turnOnColor(clickedColor)

    if(clickedColor == this.pattern[this.subLevel]) {
      this.subLevel++

      if(this.subLevel == this.level) {
        this.deleteClickEvents()
        this.level++

        if(this.level == (LAST_LEVEL + 1)) {
          this.winGame()
        } else {
          this.winLevel()
        }
      }
    } else {
      this.loseGame()
    }
  }

  winLevel() {
    swal('Simon Colors', 'Perfect!, next level', 'success')
      .then(() => setTimeout(this.nextLevel, 800))
  }

  winGame() {
    swal('Simon Colors', 'Congratulations, you win!', 'success')
      .then(() => this.initialize())
  }
  
  loseGame() {
    swal('You lose :(', 'But you can try it again, don\'t give up!', 'error')
      .then(() => {
        this.deleteClickEvents()
        this.initialize()
      })
  }

  addClickEvents() {
    this.colors.forEach(item => item.addEventListener('click', this.chooseColor))
  }
  
  deleteClickEvents() {
    this.colors.forEach(item => item.removeEventListener('click', this.chooseColor))
  }
}

function startGame() {
  const game = new Game()
}
