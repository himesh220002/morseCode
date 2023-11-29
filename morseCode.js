

const readline = require('readline');

const playSound = require('play-sound')();

// Morse Code Dictionary
const morseCode = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
  'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
  'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..',
  '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', '0': '-----',
  '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--', '/': '-..-.', '(': '-.--.',
  ')': '-.--.-', '&': '.-...', ':': '---...', ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-',
  '_': '..--.-', '"': '.-..-.', '$': '...-..-', '@': '.--.-.'
};

// Function to encode text to Morse code
function encodeToMorse(text) {
  return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
}

// Function to decode Morse code to text
function decodeFromMorse(code) {
  const reversedMorseCode = Object.fromEntries(Object.entries(morseCode).map(([key, value]) => [value, key]));
  return code.split(' ').map(symbol => reversedMorseCode[symbol] || symbol).join('');
}

// Function to play Morse code sound
function playMorseCodeSound(morseCode) {
  const dotDuration = 200; // milliseconds
  const dashDuration = 3 * dotDuration;

  for (const symbol of morseCode) {
    if (symbol === '.') {
      playSound.play('./dot.wav'); // Change the path to the actual path of your dot sound file
      sleep(dotDuration);
    } else if (symbol === '-') {
      playSound.play('./dash.wav'); // Change the path to the actual path of your dash sound file
      sleep(dashDuration);
    } else if (symbol === ' ') {
      sleep(dotDuration); // Pause between words
    }
  }
}


// Function to handle user input and conversion
function handleConversion() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Do you want to convert text to Morse code or Morse code to text? (Enter "text" or "morse"): ', (choice) => {
    if (choice.toLowerCase() === 'text'||'t') {
      rl.question('Enter the text to encode: ', (textToEncode) => {
        const morseCodeResult = encodeToMorse(textToEncode);
        console.log('Encoded Morse Code:', morseCodeResult);
        playMorseCodeSound(morseCodeResult);
        rl.close();
      });
    } else if (choice.toLowerCase() === 'morse'||'m') {
      rl.question('Enter the Morse code to decode (use space as separator): ', (morseCodeInput) => {
        const decodedTextResult = decodeFromMorse(morseCodeInput);
        console.log('Decoded Text:', decodedTextResult);
        rl.close();
      });
    } else {
      console.log('Invalid choice. Please enter either "text" or "morse".');
      rl.close();
    }
  });
}

// Invoke the function to handle user input and conversion
handleConversion();

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}