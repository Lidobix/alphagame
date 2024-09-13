const INPUT_QTY = 5;
let selectedIndex;
const letters = [];
let endGame;

window.addEventListener('DOMContentLoaded', function () {
  addKeyboardEvents();
  startGame();
});

startGame = () => {
  createInitialDatas();
  createGameBoard();
};

createGameBoard = () => {
  const gameBoard = document.getElementById('gameBoard');
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild);
  }
  createLetters(gameBoard);
};

updateLettersStatus = () => {
  let divLetter;
  letters.forEach((letter, index) => {
    divLetter = document.getElementById(`letter_${index}`);
    divLetter.innerText = letter.currentValue;

    if (!letter.isInput) {
      divLetter.classList.add('letterFixed');
    } else if (!letter.isValid && letter.currentValue !== '') {
      changeClasses(divLetter, 'notValid');
    } else if (!letter.isValid && letter.currentValue === '') {
      changeClasses(divLetter, 'letterInput');
    } else if (letter.isValid) {
      changeClasses(divLetter, 'valid');
    }

    if (letter.isSelected) {
      changeClasses(divLetter, 'selected');
      if (!letter.isValid && letter.currentValue !== '') {
        divLetter.classList.remove('selected');
        divLetter.classList.remove('unselected');
        divLetter.classList.remove('notValid');
        divLetter.classList.add('notValidSelected');
      }
    } else if (!letter.isValid && letter.currentValue !== '') {
      changeClasses(divLetter, 'notValid');
    }
  });
};

changeClasses = (input, newClass) => {
  const allClasses = ['selected', 'unselected', 'valid', 'notValidSelected'];
  input.classList.remove(...allClasses);
  input.classList.add(newClass);
};

addKeyboardEvents = () => {
  let keyDown = false;

  document.addEventListener('keydown', (e) => {
    if (!keyDown) {
      if (!endGame) {
        keyDown = true;
        updateDatas(e.key, e.code);
        updateLettersStatus();
      }

      if (e.key === ' ' && endGame) {
        const modal = document.getElementById('winModal');
        modal.classList.add('notVisible');
        modal.classList.remove('show');
        startGame();
      }

      keyDown = true;
      setTimeout(() => {
        if (keyDown) {
          keyDown = false;
        }
      }, 75);
    }
  });

  this.document.addEventListener('keyup', () => {
    keyDown = false;
  });
};

const updateDatas = (key, code) => {
  let step = 0;

  if (key === 'Backspace') {
    letters[selectedIndex].currentValue = '';
  }

  if (azertyTransform(code) === `Key${key.toUpperCase()}`) {
    letters[selectedIndex].currentValue = key;
    checkDatas();
  }

  if (key === 'ArrowRight' || key === 'ArrowLeft') {
    step = key === 'ArrowRight' ? 1 : -1;
    updateIndex(step);
  }
};

checkDatas = () => {
  let step = 0;
  const { targetValue, currentValue } = letters[selectedIndex];

  if (targetValue === currentValue) {
    letters[selectedIndex].isValid = true;
    step = 1;
  }

  const victory = letters.every((letter) => {
    return letter.isValid;
  });

  if (victory) {
    endGame = true;
    letters[selectedIndex].isSelected = false;
    openWinningModal();
  } else {
    updateIndex(step);
  }
};

const updateIndex = (step) => {
  letters[selectedIndex].isSelected = false;
  let notSelectable = true;

  while (notSelectable) {
    selectedIndex = selectedIndex + step;
    if (selectedIndex >= letters.length) {
      selectedIndex = 0;
    } else if (selectedIndex < 0) {
      selectedIndex = letters.length - 1;
    }

    notSelectable = letters[selectedIndex].isValid;
  }
  letters[selectedIndex].isSelected = true;
};

createInitialDatas = () => {
  endGame = false;
  const missingLetters = determineMissingLetters();
  selectedIndex = missingLetters[0];

  for (let i = 0; i < alphabet.length; i++) {
    const isInput = missingLetters.includes(i);

    const letter = {
      targetValue: alphabet[i],
      currentValue: isInput ? '' : alphabet[i],
      isInput,
      isValid: !isInput,
      isSelected: i === selectedIndex,
    };
    letters[i] = letter;
  }
};

const determineMissingLetters = () => {
  const selectedLetters = [];

  for (let i = 0; i < INPUT_QTY; i++) {
    let selectedLetter = getLetterIndex();

    while (selectedLetters.includes(selectedLetter)) {
      selectedLetter = getLetterIndex();
    }
    selectedLetters.push(selectedLetter);
  }

  return selectedLetters.sort((a, b) => a - b);
};

const getRandomInt = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
};

const createLetters = (gameBoard) => {
  for (let i = 0; i < letters.length; i++) {
    const newLetter = document.createElement('div');
    newLetter.id = `letter_${i}`;
    newLetter.innerText = letters[i].currentValue;
    newLetter.classList.add('letterContainer');
    gameBoard.appendChild(newLetter);
  }

  updateLettersStatus();
};

const openWinningModal = () => {
  const ninja = getNinja();

  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');
  line1.style.color = ninja.color1;
  line2.style.color = ninja.color2;

  const ninjaImage = `url(./assets/${ninja.name})`;
  const modal = document.getElementById('winModal');
  modal.style.backgroundImage = ninjaImage;
  modal.classList.remove('notVisible');
  modal.classList.add('show');
};

const getLetterIndex = () => {
  return getRandomInt(0, alphabet.length);
};

const getNinja = () => {
  return ninjas[getRandomInt(0, ninjas.length)];
};

const azertyTransform = (code) => {
  let [prefix, letter] = code.split('Key');

  switch (letter) {
    case 'Q':
      letter = 'A';
      break;
    case 'A':
      letter = 'Q';
      break;
    case 'W':
      letter = 'Z';
      break;
    case 'Z':
      letter = 'W';
      break;
  }
  if (prefix === 'Semicolon') {
    letter = 'M';
  }

  return `Key${letter}`;
};

const alphabet = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

const ninjas = [
  { name: 'all.png', color1: 'red', color2: 'red' },
  { name: 'cole.png', color1: 'white', color2: 'white' },
  { name: 'kai.png', color1: 'white', color2: 'white' },
  { name: 'lloyd.png', color1: 'white', color2: 'white' },
  { name: 'zane.png', color1: 'white', color2: 'white' },
];
