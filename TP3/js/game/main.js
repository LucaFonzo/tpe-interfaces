"use strict"
import Game from "./Game.js";

document.addEventListener('DOMContentLoaded', initialize);

function initialize() {
  setListeners();
  const gameSection = document.querySelector(".game");
  const startBtn = document.querySelector(".start .play");
  const startScreen = document.querySelector(".start");
  const alertBtn = document.querySelector(".alert h2");
  const backgroundMusic = document.getElementById("music");
  const musicBtn = document.querySelector('#music-btn');

  alertBtn.addEventListener("click", (e) => {
    document.querySelector(".alert").classList.add("d-none");
  });

  musicBtn.addEventListener('click', (e) => {
    if (backgroundMusic.paused) {
      backgroundMusic.play();
      musicBtn.classList.remove('sound-mute-icn');
      musicBtn.classList.add('sound-icn');
    } else {
      backgroundMusic.pause();
      musicBtn.classList.remove('sound-icn');
      musicBtn.classList.add('sound-mute-icn');
    }
  })

  startBtn.addEventListener("click", async (e) => {
    backgroundMusic.volume = 0.3;
    backgroundMusic.play();
    musicBtn.parentElement.classList.remove('d-none');
    const configuration = setConfiguration(gameSection.querySelector(".game-screen"));
    if (configuration == null) return;
    startScreen.classList.add("d-none");
    gameSection.classList.add("active");
    configuration.canvas.classList.remove("d-none");
    gameSection.querySelector(".game-screen").style.backgroundImage = `url(${configuration.background})`;
    const game = new Game(configuration);
    game.initGame(configuration);
  });

}

function setListeners() {
  const radiosType = document.querySelectorAll(".start .radio");
  radiosType.forEach((radio) => {
    radio.addEventListener("click", (e) => {
      radiosType.forEach((radio) => {
        radio.classList.remove("checked");
      });
      radio.classList.add("checked");
    });
  });

  const backgrounds = document.querySelectorAll(".start .settings #background img");
  backgrounds.forEach((background) => {
    background.addEventListener("click", (e) => {
      backgrounds.forEach((background) => {
        background.classList.remove("selected");
      });
      background.classList.add("selected");
    });
  });

  const colorsP1 = document.querySelectorAll(".start .p1 .color-select span");
  colorsP1.forEach((color) => {
    color.addEventListener("click", (e) => {
      if (color.classList.contains("disabled")) return;

      colorsP1.forEach((color1) => {
        color1.classList.remove("selected");
      });

      color.classList.add("selected");

      colorsP2.forEach((color2) => {
        color2.classList.remove("disabled");
        if (color2.getAttribute('value') == color.getAttribute('value')) {
          color2.classList.add("disabled");
        }
      });

      charsP1.forEach((char1) => {
        char1.setAttribute('value', color.getAttribute('value'));
      });
    });
  });

  const colorsP2 = document.querySelectorAll(".start .p2 .color-select span");
  colorsP2.forEach((color) => {
    color.addEventListener("click", (e) => {
      if (color.classList.contains("disabled")) return;

      colorsP2.forEach((color2) => {
        color2.classList.remove("selected");
      });

      color.classList.add("selected");

      colorsP1.forEach((color1) => {
        color1.classList.remove("disabled");
        if (color1.getAttribute('value') == color.getAttribute('value')) {
          color1.classList.add("disabled");
        }
      });

      charsP2.forEach((char2) => {
        char2.setAttribute('value', color.getAttribute('value'));
      });
    });
  });

  const charsP1 = document.querySelectorAll(".start .p1 .char-select span");
  charsP1.forEach((char) => {
    char.addEventListener("click", (e) => {
      if (char.classList.contains("disabled")) return;

      charsP1.forEach((char1) => {
        char1.classList.remove("selected");
      });

      char.classList.add("selected");

      charsP2.forEach((char2) => {
        char2.classList.remove("disabled");
        if (char2.getAttribute('character') == char.getAttribute('character')) {
          char2.classList.add("disabled");
        }
      });
    });
  });

  const charsP2 = document.querySelectorAll(".start .p2 .char-select span");
  charsP2.forEach((char) => {
    char.addEventListener("click", (e) => {
      if (char.classList.contains("disabled")) return;

      charsP2.forEach((char2) => {
        char2.classList.remove("selected");
      });

      char.classList.add("selected");

      charsP1.forEach((char1) => {
        char1.classList.remove("disabled");
        if (char1.getAttribute('character') == char.getAttribute('character')) {
          char1.classList.add("disabled");
        }
      });
    });
  });
}

function setConfiguration(container) {
  let nameP1 = document.querySelector('input[name="p1-name"]').value;
  let nameP2 = document.querySelector('input[name="p2-name"]').value;
  let time = document.querySelector('input[name="time"]').value == "" ? 60 : document.querySelector('input[name="time"]').value;

  if (nameP1 == "" || nameP2 == "" || time < 15) {
    document.querySelector(".alert").classList.remove("d-none");
    return null;
  }

  const canvas = document.querySelector('.main-canvas');
  const checkedRadio = document.querySelector('.radio.checked').getAttribute('value');
  let rows;
  let cols;
  let disks;
  let tileSize;
  let speed;

  switch (checkedRadio) {
    case '4':
      rows = 6;
      cols = 7;
      disks = 14;
      tileSize = 100;
      speed = 8;
      break;
    case '5':
      rows = 7;
      cols = 9;
      disks = 16;
      tileSize = 80;
      speed = 6;
      break;
    case '6':
      rows = 8;
      cols = 11;
      disks = 18;
      tileSize = 70;
      speed = 5;
      break;
  }

  const colorP1 = getColor(document.querySelector(".start .p1 .color-select span.selected").getAttribute("value"));
  const colorP2 = getColor(document.querySelector(".start .p2 .color-select span.selected").getAttribute("value"));
  const charP1 = getCharacter(document.querySelector(".start .p1 .char-select span.selected").getAttribute("character"));
  const charP2 = getCharacter(document.querySelector(".start .p2 .char-select span.selected").getAttribute("character"));

  let config = {
    canvas,
    context: canvas.getContext('2d'),
    background: document.querySelector(".start .settings #background img.selected").getAttribute("src"),
    width: parseInt(canvas.width),
    height: parseInt(canvas.height),
    tileSize,
    tileStyle: "t1",
    rows,
    cols,
    players: [
      {
        name: document.querySelector('input[name="p1-name"]').value,
        color: colorP1,
        character: charP1,
        img: document.querySelector(".player.p1 img").src
      },
      {
        name: document.querySelector('input[name="p2-name"]').value,
        color: colorP2,
        character: charP2,
        img: document.querySelector(".player.p2 img").src
      }
    ],
    totalDisks: disks,
    winNumber: checkedRadio,
    speed,
    time
  }

  return config;
}

function getColor(color) {
  switch (color) {
    case 'red':
      return "assets/game/disk-r.png";
    case 'blue':
      return "assets/game/disk-b.png";
    case 'yellow':
      return "assets/game/disk-y.png";
    default:
      return null;
  }
}

function getCharacter(character) {
  switch (character) {
    case 'tom':
      return "assets/game/tom.png";
    case 'jerry':
      return "assets/game/jerry.png";
    case 'spike':
      return "assets/game/spike.png";
    default:
      return null;
  }
}

