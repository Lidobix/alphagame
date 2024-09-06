const INPUT_QTY = 5;
let selectedIndex;
const letters = [];
let endGame;

window.addEventListener('DOMContentLoaded', function () {
  startGame();
});

startGame = () => {
  createInitialDatas();
  createGameBoard();
  addKeyboardEvents();
};

createGameBoard = () => {
  endGame = false;

  const gameContainer = document.createElement('div');
  gameContainer.id = 'gameBoard';
  const body = document.querySelector('body');
  body.appendChild(gameContainer);

  createLetters();
  // updateLettersStatus();
};

updateLettersStatus = () => {
  // for (let i = 0; i < letters.length; i++) {}
  letters.forEach((letter, index) => {
    // console.log(letter);
    const divLetter = document.getElementById(`letter_${index}`);
    divLetter.innerText = letter.currentValue;
    divLetter.classList.add(letter.isInput ? 'letterInput' : 'letterFixed');

    // if (letter.isValid) {
    //   input.classList.remove('selected');
    //   input.classList.remove('unselected');
    //   input.classList.remove('notValid');
    //   input.classList.add('valid');
    // } else if (!letter.isValid && letter.currentValue !== '') {
    //   input.classList.remove('selected');
    //   input.classList.remove('unselected');
    //   input.classList.remove('valid');
    //   input.classList.add('notValid');
    // }
    if (letter.isSelected) {
      if (!letter.isValid) {
        divLetter.classList.remove('notValid');
        // input.classList.add('notValidSelected');
      }
      divLetter.classList.remove('unselected');
      divLetter.classList.add('selected');
    } else {
      divLetter.classList.remove('selected');
    }
  });

  // updateDatas();
};

const checkKeyboard = (code) => {
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

addKeyboardEvents = () => {
  let keyDown = false;

  document.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if (!keyDown) {
      if (e.key === 'Tab') {
        return;
      }

      if (e.key === 'Backspace') {
        keyDown = true;
        // letters[selectedIndex].currentValue = '';
        // updateLettersStatus();
        updateDatas(e.key);
      }

      if (checkKeyboard(e.code) === `Key${e.key.toUpperCase()}`) {
        keyDown = true;
        // letters[selectedIndex].currentValue = e.key;
        // updateLettersStatus();
        updateDatas(e.key);
      }

      if (
        e.key === 'ArrowRight'
        //  && selectedIndex < letters.length - 1
      ) {
        // letters[selectedIndex].isSelected = false;
        // selectedIndex++;
        // letters[selectedIndex].isSelected = true;
        // updateLettersStatus();
        updateDatas(e.key);
      }

      if (
        e.key === 'ArrowLeft'
        //  && selectedIndex > 0
      ) {
        // letters[selectedIndex].isSelected = false;
        // selectedIndex--;
        // letters[selectedIndex].isSelected = true;
        // updateLettersStatus();
        updateDatas(e.key);
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

const updateDatas = (letterValue) => {
  console.log('letter+' + letterValue + '+Value', selectedIndex);
  letters[selectedIndex].currentValue =
    letterValue === 'Backspace' ? '' : letterValue;

  // letters.forEach((letter, index) => {
  //   if (letter.isValid && letters.length > 1) {
  //     letters.splice(index, 1);
  //     defineNextInput();
  //     updateLettersStatus();
  //   } else if (letter.isValid && letters.length === 1) {
  //     openWinningModal();
  //     endGame = true;
  //   }
  // });

  updateLettersStatus();
};

// const defineNextInput = () => {
//   if (selectedIndex >= letters.length) {
//     selectedIndex--;
//   }
//   letters[selectedIndex].isSelected = true;
// };

createInitialDatas = () => {
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
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

const createLetters = () => {
  // console.log('vreate letters');
  const gameBoard = document.getElementById('gameBoard');
  for (let i = 0; i < letters.length; i++) {
    const newLetter = document.createElement('div');
    newLetter.id = `letter_${i}`;
    newLetter.innerText = letters[i].currentValue;
    newLetter.classList.add('letterContainer');
    gameBoard.appendChild(newLetter);
  }

  updateLettersStatus();
};

// const openWinningModal = () => {
//   const ninja = getNinja();

//   const line1 = document.getElementById('line1');
//   const line2 = document.getElementById('line2');
//   line1.style.color = ninja.color1;
//   line2.style.color = ninja.color2;

//   const ninjaImage = `url(./assets/${ninja.name}.png)`;
//   const modal = document.getElementById('winModal');
//   modal.style.backgroundImage = ninjaImage;
//   modal.classList.remove('notVisible');
//   modal.classList.add('show');
// };

const getLetterIndex = () => {
  return getRandomInt(0, alphabet.length);
};

// const getNinja = () => {
//   return ninjas[getRandomInt(0, ninjas.length)];
// };

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

// const ninjas = [
//   { name: 'all', color1: 'red', color2: 'red' },
//   { name: 'cole', color1: 'white', color2: 'white' },
//   { name: 'kai', color1: 'white', color2: 'white' },
//   { name: 'lloyd', color1: 'white', color2: 'white' },
//   { name: 'zane', color1: 'white', color2: 'white' },
// ];
