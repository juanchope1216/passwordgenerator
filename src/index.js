const buttonCopy = document.getElementById("button-copy");
const form = document.getElementById("passwordGeneratorForm");
const passwordDisplay = document.getElementById("passwordDisplay");
const characterAmountRange = document.getElementById("characterAmountRange");
const characterAmountNumber = document.getElementById("characterAmountNumber");

characterAmountRange.addEventListener("input", syncCharacterAmount);
characterAmountNumber.addEventListener("input", syncCharacterAmount);

const LETTERS_CHAR_CODES = arrayFromLowToHigh(97, 122).map(char =>
  (String.fromCharCode(char))
);
const NUMBERS_CHAR_CODES = arrayFromLowToHigh(48, 57).map(char =>
  (String.fromCharCode(char))
);
const SYMBOL_CHAR_CODES = arrayFromLowToHigh(33, 47).map(char =>
  (String.fromCharCode(char))
);

function arrayFromLowToHigh(low, high) {
  const array = []
  for (let i = low; i <= high; i++) {
    array.push(i)
  }
  return array;
}

function syncCharacterAmount(e) {
  const value = e.target.value;
  characterAmountRange.value = value;
  characterAmountNumber.value = value;
}

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1));
}

function copyToClipboard(target) {
  const element = document.querySelector(target);
  const value = element.value;

  if (value.length === 0) {
    alert("You must generate a password");
  } else {
    window.navigator.clipboard.writeText(value);
    alert("Copied password");
  }
}

function generatePassword(characterAmount, checks) {
  let charCodes = [];

  if (checks.letters) {
    charCodes.push(LETTERS_CHAR_CODES);
  }

  if (checks.numbers) {
    charCodes.push(NUMBERS_CHAR_CODES);
  }

  if (checks.symbols) {
    charCodes.push(SYMBOL_CHAR_CODES);
  }

  let passwordCharacters = [];
  for (let i = 0; i < characterAmount; i++) {
    const characterCode = charCodes[getRandomNumber(0, charCodes.length - 1)];
    const randomCharacter = characterCode[getRandomNumber(0, characterCode.length - 1)];
    passwordCharacters.push(randomCharacter);
  }

  passwordCharacters = passwordCharacters.join("");
  passwordDisplay.value = passwordCharacters;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const formElement = e.target;
  const characterAmount = characterAmountNumber.value;

  const checks = {
    letters: formElement.letters.checked,
    numbers: formElement.numbers.checked,
    symbols: formElement.symbols.checked,
  }

  generatePassword(characterAmount, checks);
})

buttonCopy.addEventListener("click", () => {
  copyToClipboard("#passwordDisplay");
})