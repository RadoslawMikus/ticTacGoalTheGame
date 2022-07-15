// --------------------
// PREGAME CLASS
// --------------------
const chooseYourFighter = document.querySelector("h3");
const fighters = document.querySelectorAll(".fighters");
const playerNumber = document.querySelectorAll(".playerNumber");
const musicButton = document.querySelector(".musicSwitch");
const startButton = document.querySelector(".start");

// let newGame;

class Pregame {
  static music = "on";
  static player1 = {};
  static player2 = {};

  static setPregame() {
    console.log("SetPregame");
    musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    musicButton.addEventListener("click", () => Pregame.setMusic());
    Player.chooseYourFighter();
    this.howManyGames();
    this.whoIsFirst();

    // window.addEventListener("click", () => {
    //   console.log("Pregame: " + Pregame.numberOfGames);
    //   // console.log("Game: " + Game.numberOfGames);
    //   console.log("New Game " + this.newGame.numberOfGames);
    // });
  }

  // VERIFY IF EVERYTHING IS CHECKED,
  // THEN UNLOCK START BUTTON
  static unlockStart() {
    console.log("Unlock start");
    let message;
    const test = (par1, par2, par3, text, unlock) => {
      if (
        typeof this.numberOfGames === par1 &&
        typeof this.player1.name === par2 &&
        typeof this.player2.name === par3
      ) {
        if (unlock) {
          startButton.removeAttribute("disabled");
        } else {
          startButton.setAttribute("disabled", "disabled");
        }
        message = text;
      }
    };
    test("number", "string", "string", "START THE GAME!", true);
    test("undefined", "string", "string", "CHECK NUMBER OF GAMES", false);
    test("number", "string", "undefined", "CHOOSE YOUR OPPONENT!", false);
    test("undefined", "string", "undefined", "CHOOSE YOUR OPPONENT!", false);
    test("number", "undefined", "undefined", "CHOOSE YOUR FIGHTER!", false);

    return message;
  }

  static whoIsFirst() {
    console.log("WhoIsFirst");
    this.activePlayer = Math.floor(Math.random() * (3 - 1)) + 1;
  }

  // SET HOW MANY GAMES WILL BE PLAYED
  static howManyGames() {
    console.log("howManyGames");
    const howManyGames = document.getElementsByName("howManyGames");

    howManyGames.forEach((how) =>
      how.addEventListener("change", () => {
        this.numberOfGames = parseInt(how.value);
        chooseYourFighter.textContent = this.unlockStart();
      })
    );

    return this.numberOfGames;
  }

  static setMusic() {
    console.log("setMusic");
    if (musicButton.innerHTML === '<i class="fa-solid fa-volume-high"></i>') {
      musicButton.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
      this.music = "off";
    } else {
      musicButton.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
      this.music = "on";
    }
    return this.music;
  }

  // LOAD NEW GAME
  static load() {
    console.log("load");
    this.newGame = new Game(
      this.activePlayer,
      this.numberOfGames,
      this.player1,
      this.player2,
      this.music
    );
    this.newGame.start();
    this.initialized = true;
    return `How many games: ${this.numberOfGames} Player1: ${this.player1.name} Player2: ${this.player2.name} ActivePlayer: ${this.activePlayer}`;
  }
}

// --------------------
// PLAYER CLASS
// --------------------
class Player {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  // CHOOSE YOUR FIGHTER
  static chooseYourFighter() {
    console.log("choose your fighter");
    fighters.forEach((fighter, number) => {
      fighter.addEventListener("click", (e) => {
        const chooseFighter = (short, full) => {
          e.target.classList.add("chosen");
          playerNumber[number].textContent = short;
          playerNumber[number].classList.remove("player1", "player2");
          if (short === "P1") {
            playerNumber[number].classList.add("player1");
          } else {
            playerNumber[number].classList.add("player2");
          }
          //CREATE NEW PLAYER
          Pregame[full] = new Player(
            e.target.getAttribute("name"),
            `../assets/fighters/${e.target.classList[1]}.jpg`
          );
          chooseYourFighter.textContent = Pregame.unlockStart();
        };
        if (
          Pregame.player1.name !== undefined &&
          Pregame.player2.name !== undefined
        ) {
          Pregame.player1 = {};
          Pregame.player2 = {};
          fighters.forEach((fighter) => {
            fighter.classList.remove("chosen");
            playerNumber.forEach((tekst) => {
              tekst.textContent = "";
            });
          });
        }

        if (
          Pregame.player1.name === undefined ||
          e.target.getAttribute("name") === Pregame.player1.name
        ) {
          chooseFighter("P1", "player1");
        } else {
          chooseFighter("P2", "player2");
        }
      });
    });
  }
}

Pregame.setPregame();

// START NEW GAME
startButton.addEventListener("click", () => {
  Pregame.load();
});
