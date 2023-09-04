const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, incorrectLetters = [], correctLetters = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function isThaiCharacter(char) {
    return char.match(/^[ก-๏๑-๙\s]+$/);
  }
  
  function initGame(e) {
    let key = e.target.value.trim(); // ตัดช่องว่างข้างหน้าและหลังออก
    if (isThaiCharacter(key) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
      if (word.includes(key)) {
        for (let i = 0; i < word.length; i++) {
          if (word[i] === key) {
            correctLetters += key;
            inputs.querySelectorAll("input")[i].value = key;
          }
        }
      } else {
        maxGuesses--;
        incorrectLetters.push(` ${key}`);
      }
      guessLeft.innerText = maxGuesses;
      wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";
  
    setTimeout(() => {
      if (correctLetters.length === word.length) {
        alert(`ยินดีด้วย คุณทายถูก! คำตอบคือ ${word.toUpperCase()}`);
        return randomWord();
      } else if (maxGuesses < 1) {
        alert("เกมจบแล้ว!! คุณทายผิด");
        for (let i = 0; i < word.length; i++) {
          inputs.querySelectorAll("input")[i].value = word[i];
        }
      }
    }, 100);
  }
  

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());