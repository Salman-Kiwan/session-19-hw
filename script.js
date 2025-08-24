document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // --- Elements
  const startBtn = document.getElementById("start-btn");
  const playerName = document.getElementById("player-name");
  const playerLevel = document.getElementById("player-level");
  const highScore = document.getElementById("high-score");

  // Buttons
  const green = document.getElementById("green");
  const red = document.getElementById("red");
  const yellow = document.getElementById("yellow");
  const blue = document.getElementById("blue");

  // Sounds
  const greenSound = document.getElementById("green-sound");
  const redSound = document.getElementById("red-sound");
  const yellowSound = document.getElementById("yellow-sound");
  const blueSound = document.getElementById("blue-sound");
  const wrongSound = document.getElementById("wrong-sound"); // always ready for mistakes
  const correctSound = document.getElementById("correct-sound");
  const backgroundMusic = document.getElementById("game-sound");

  const colorBtns = {
    green: { btn: green, sound: greenSound },
    red: { btn: red, sound: redSound },
    yellow: { btn: yellow, sound: yellowSound },
    blue: { btn: blue, sound: blueSound },
  };

  // --- Game data
  let compMoves = []; // computer moves
  let userMoves = []; // player moves
  let level = 1; // deffault level
  let playing = false; // flag
  let highScoreValue = 0;

  // Players name
  const name = prompt("What is your name?");
  if (name) {
    playerName.textContent = name[0].toUpperCase() + name.slice(1);
  } else {
    playerName.textContent = "Player"; // default if empty
  }
  playerLevel.textContent = level;

  // animation button with sound
  function playBtn(color) {
    let { btn, sound } = colorBtns[color];
    btn.classList.add("scale-[0.87]", "ring-4", "ring-red-500", "border-0");
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
      btn.classList.remove(
        "scale-[0.87]",
        "ring-4",
        "ring-red-500",
        "border-0"
      );
    }, 300);
  }

  // show computer sequence
  function playSequence() {
    let i = 0;
    let interval = setInterval(() => {
      playBtn(compMoves[i]);
      i++;
      if (i >= compMoves.length) clearInterval(interval);
    }, 700);
  }

  // go to next level
  function nextLevel() {
    userMoves = []; // clear what player did
    compMoves = []; // clear computer moves
    for (let i = 0; i < level; i++) {
      compMoves.push(Object.keys(colorBtns)[Math.floor(Math.random() * 4)]); // add new move
    }
    playSequence();
    playerLevel.textContent = level;
  }

  // check player's click
  function checkMove(color) {
    userMoves.push(color);
    playBtn(color);

    let idx = userMoves.length - 1;

    // wrong click
    if (userMoves[idx] !== compMoves[idx]) {
      backgroundMusic.loop = false;
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
      wrongSound.currentTime = 0;
      wrongSound.play();
      alert("Oops! Wrong! You reached level " + level);
      resetGame();
      return;
    }

    // if player finished
    if (userMoves.length === compMoves.length) {
      level++;
      setTimeout(() => {
        correctSound.currentTime = 0;
        correctSound.play();
      }, 500);
      setTimeout(nextLevel, 1200);
    }
  }
  ``;

  // reset game
  function resetGame() {
    highScoreValue =
      highScore > level
        ? (highScore.textContent = highScore)
        : (highScore.textContent = level);
    level = 1;
    compMoves = [];
    userMoves = [];
    playing = false;
    startBtn.textContent = "Start! ";
    playerLevel.textContent = level;

    stopDots();
  }

  // Start button
  startBtn.addEventListener("click", () => {
    if (playing) return; // !extra clicks

    // Start audoi
    correctSound.currentTime = 0;
    correctSound.play();

    // game audio
    backgroundMusic.loop = true;
    backgroundMusic.play();

    // defualt
    playing = true;
    level = 1;
    compMoves = [];
    userMoves = [];
    playerLevel.textContent = level;
    animateDots();
    nextLevel(); // start first level
  });

  //Player clicks
  Object.keys(colorBtns).forEach((color) => {
    colorBtns[color].btn.addEventListener("click", () => {
      if (!playing) return; // ( not started yet)
      checkMove(color);
    });
  });
  let dots = 1;
  let dotsInterval;

  function animateDots() {
    dotsInterval = setInterval(() => {
      dots = dots % 3;
      dots++;
      startBtn.textContent = ".".repeat(dots);
    }, 500);
  }
  function stopDots() {
    clearInterval(dotsInterval);
    startBtn.textContent = "Start!";
  }
});
