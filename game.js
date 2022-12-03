const values = {
  level: 0,
  gameChosenColour: [],
  userClickedColour: [],
  buttonColours: ['red', 'blue', 'green', 'yellow']
}

const controlElements = {
  title: document.querySelector('[data-control="title"]'),
  buttons: document.querySelectorAll('[data-control="btn"]')
}

let { userClickedColour, gameChosenColour, buttonColours, level } = values;

const playSound = (name) => {
  const audio = new Audio('sounds/' + name + '.mp3');

  audio.play();
}

const switchCssClass = (element, cssClass) => {
  const elem = element.classList;

  elem.add(cssClass);
  setTimeout(() => {
    elem.remove(cssClass);
  }, 100);
}

const showGameChoosigColor = (colors, cssClass) => {
  colors.forEach((elem, i) => {
    setTimeout(() => {
      switchCssClass(document.getElementById(elem), cssClass);
      playSound(elem);
    }, i * 500)
  })
}

const setLevel = () => {
  ++level;
  controlElements.title.innerHTML = 'Level ' + level;
}

const setNextSequence = () => {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  const activeBtnClass = 'active-btn-js';

  gameChosenColour.push(randomChosenColour);
  showGameChoosigColor(gameChosenColour, activeBtnClass)
  setLevel();
}

const startNextSequence = (time) => {
  setTimeout(() => {
    setNextSequence();
  }, time);
}

const checkAnswer = () => {
  const index = values.userClickedColour.length - 1;

  if (userClickedColour[index] !== gameChosenColour[index]) {
    playSound('wrong');
    switchCssClass(document.body, 'game-over');
    controlElements.title.innerHTML = "GAME OVER<br/>Press any button to Restart";
  }
  if (userClickedColour.toString() === gameChosenColour.toString()) {
    startNextSequence(1000);
    userClickedColour.length = 0;
  }
}

controlElements.buttons.forEach((elem) => {
  elem.addEventListener('click', (event) => {
    const { id } = event.target;
    const index = userClickedColour.length - 1;

    if (userClickedColour[index] !== gameChosenColour[index]) {
      userClickedColour.length = 0;
      gameChosenColour.length = 0;
      level = 0;
      startNextSequence(250);
    }
    else if(level === 0) {
      startNextSequence(250);
    }
    else{
      userClickedColour.push(id);
      playSound(id);
      switchCssClass(event.target, 'pressed');
      checkAnswer();
    }
  });
});
