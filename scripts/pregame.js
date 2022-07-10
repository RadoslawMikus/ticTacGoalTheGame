// let numberOfGames;
const chooseYourFighter = document.querySelector("h3");

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.howManyGames = Game.howManyGames();
  }

  static unlockStart() {
    let message;
    const test = (par1, par2, par3, text, unlock) => {
      if (
        typeof this.numberOfGames === par1 &&
        typeof players.player1 === par2 &&
        typeof players.player2 === par3
      ) {
        if (unlock) {
          startButton.removeAttribute("disabled");
        }
        message = text;
      }
    };
    test("number", "object", "object", "START THE GAME!", true);
    test("undefined", "object", "object", "CHECK NUMBER OF GAMES", false);
    test("number", "object", "undefined", "CHOOSE YOUR OPPONENT!", false);
    test("undefined", "object", "undefined", "CHOOSE YOUR OPPONENT!", false);
    test("number", "undefined", "undefined", "CHOOSE YOUR FIGHTER!", false);

    return message;
  }

  static howManyGames() {
    const howManyGames = document.getElementsByName("howManyGames");

    howManyGames.forEach((how) =>
      how.addEventListener("change", () => {
        this.numberOfGames = parseInt(how.value);
        chooseYourFighter.textContent = this.unlockStart();
      })
    );
    return this.numberOfGames;
  }

  start() {
    return `How many games: ${this.howManyGames} Player1: ${this.player1.name} Player2: ${this.player2.name}`;
  }
}

let players = { player1: undefined, player2: undefined };
class Player {
  constructor(name, img) {
    this.name = name;
    this.img = img;
  }

  static chooseYourFighter() {
    const fighters = document.querySelectorAll(".fighters");
    const playerNumber = document.querySelectorAll(".playerNumber");

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
          players[full] = new Player(
            e.target.getAttribute("name"),
            `../assets/fighters/${e.target.classList[1]}.jpg`
          );
          chooseYourFighter.textContent = Game.unlockStart();
        };
        if (players.player1 !== undefined && players.player2 !== undefined) {
          players.player1 = undefined;
          players.player2 = undefined;
          fighters.forEach((fighter) => {
            fighter.classList.remove("chosen");
            playerNumber.forEach((tekst) => {
              tekst.textContent = "";
            });
          });
        }
        if (players.player1 === undefined) {
          chooseFighter("P1", "player1");
        } else {
          chooseFighter("P2", "player2");
        }
      });
    });
  }
}

Game.howManyGames();
Player.chooseYourFighter();

let newGame;
const startButton = document.querySelector(".start");
startButton.addEventListener("click", () => {
  newGame = new Game(players.player1, players.player2);
  console.log(newGame.start());
});
