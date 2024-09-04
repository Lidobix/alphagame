const INPUT_QTY = 5;
let selectedIndex = 0;
let letters = [];

window.addEventListener('DOMContentLoaded', function () {
  createGameBoard();
  addKeyboardEvents();
});

const createGameBoard = () => {
  letters = determineMissingLetters();
  const indexes = letters.map((letter) => {
    return letter.index;
  });

  for (let i = 0; i < 26; i++) {
    if (indexes.includes(i)) {
      createInput(i);
    } else {
      createLetter(i);
    }
  }

  letters[0].isSelected = true;
  updateInputsStatus();
};

const updateInputsStatus = () => {
  for (let i = 0; i < letters.length; i++) {}
  letters.forEach((letter) => {
    const input = this.document.getElementById(`input_${letter.index}`);

    input.innerText = letter.currentValue;
    letter.isValid = letter.targetValue === letter.currentValue;

    if (letter.selected) {
      if (letter) {
      }
    }

    if (letter.isValid) {
      input.classList.remove('selected');
      input.classList.remove('unselected');
      input.classList.remove('notValid');
      input.classList.add('valid');
    } else if (!letter.isValid && letter.currentValue !== '') {
      input.classList.remove('selected');
      input.classList.remove('unselected');
      input.classList.remove('valid');
      input.classList.add('notValid');
    }

    if (letter.isSelected) {
      if (!letter.isValid) {
        input.classList.remove('notValid');
        // input.classList.add('notValidSelected');
      }
      input.classList.remove('unselected');
      input.classList.add('selected');
    } else {
      input.classList.remove('selected');
    }
  });

  updateDataLetters();
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

const addKeyboardEvents = () => {
  let keyDown = false;
  this.document.addEventListener('keydown', (e) => {
    console.log(e.code);
    if (!keyDown) {
      if (e.key === 'Tab') {
        return;
      }
      if (e.key === 'Backspace') {
        keyDown = true;
        letters[selectedIndex].currentValue = '';
      }
      console.log('key: ', e.key);
      console.log('code: ', e.code);
      if (checkKeyboard(e.code) === `Key${e.key.toUpperCase()}`) {
        keyDown = true;
        letters[selectedIndex].currentValue = e.key;
      }

      if (e.key === 'ArrowRight' && selectedIndex < letters.length - 1) {
        letters[selectedIndex].isSelected = false;
        selectedIndex++;
        letters[selectedIndex].isSelected = true;
      }

      if (e.key === 'ArrowLeft' && selectedIndex > 0) {
        letters[selectedIndex].isSelected = false;
        selectedIndex--;
        letters[selectedIndex].isSelected = true;
      }

      keyDown = true;
      this.setTimeout(() => {
        if (keyDown) {
          keyDown = false;
        }
      }, 75);

      updateInputsStatus();
    }
  });

  this.document.addEventListener('keyup', () => {
    keyDown = false;
  });
};

const updateDataLetters = () => {
  letters.forEach((letter, index) => {
    if (letter.isValid && letters.length > 1) {
      letters.splice(index, 1);
      defineNextInput();
      updateInputsStatus();
    } else if (letter.isValid && letters.length === 1) {
      winningModal();
    }
  });
};

const defineNextInput = () => {
  if (selectedIndex >= letters.length) {
    selectedIndex--;
  }
  letters[selectedIndex].isSelected = true;
};

const determineMissingLetters = () => {
  const selectedLetters = [];

  for (let i = 0; i < INPUT_QTY; i++) {
    let selectedLetter = getRandomInt();

    while (selectedLetters.includes(selectedLetter)) {
      selectedLetter = getRandomInt();
    }
    selectedLetters.push(selectedLetter);

    letters.push({
      index: selectedLetter,
      targetValue: alphabet[selectedLetter],
      currentValue: '',
      isValid: false,
      isSelected: false,
    });
  }

  return letters.sort((a, b) => a.index - b.index);
};

const getRandomInt = () => {
  const minCeiled = Math.ceil(0);
  const maxFloored = Math.floor(26);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
};

const createLetter = (letter) => {
  const resContainer = document.getElementById('resContainer');
  const newLetter = document.createElement('div');
  newLetter.innerText = alphabet[letter];
  newLetter.classList.add('letterContainer', 'letterFixed');

  resContainer.appendChild(newLetter);
};

const createInput = (index) => {
  const resContainer = document.getElementById('resContainer');
  const inputLetter = document.createElement('div');
  inputLetter.id = `input_${index}`;
  inputLetter.classList.add('letterContainer', 'letterInput');

  resContainer.appendChild(inputLetter);
};

const winningModal = () => {
  const modal = document.getElementById('winModal');
  modal.classList.remove('notVisible');
  modal.classList.add('show');
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
