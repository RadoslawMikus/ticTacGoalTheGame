// --------------------
// GAME CLASS
// --------------------

const ticTacFields = document.querySelectorAll(".ticTacField");
const playerOneTrophies = document.querySelector(".player1 .block");
const playerTwoTrophies = document.querySelector(".player2 .block");
const result = document.querySelector(".middle");

class Game {
  constructor(active, numberOfGames, player1, player2, music) {
    this.activePlayer = active;
    this.numberOfGames = numberOfGames;
    this.player1 = player1;
    this.player2 = player2;
    this.points1 = 0;
    this.points2 = 0;
    this.music = music;
  }

  // HIDE PREGAME AND SHOW GAME
  start() {
    console.log("start");
    [playerOneTrophies, playerTwoTrophies].forEach((el) => (el.innerHTML = ""));
    result.textContent = "0:0";
    toggler(".pregame, .game");
    // document
    //   .querySelectorAll(".pregame, .game")
    //   .forEach((el) => el.classList.toggle("d-none"));
    this.music === "on" ? stadium.play() : "";
    document
      .querySelector(".player1 > img")
      .setAttribute("src", this.player1.img);
    document.querySelector(".name1").textContent = this.player1.name;
    document
      .querySelector(".player2 > img")
      .setAttribute("src", this.player2.img);
    document.querySelector(".name2").textContent = this.player2.name;
    ticTacFields.forEach((field) =>
      field.addEventListener("click", () => {
        // this.checkResult();
        console.log(this);
      })
    );

    Pregame.initialized === undefined ? this.makeDecision() : "";

    const startOfTheGame = new Modal(
      `Zaczyna ${
        this.activePlayer === 1
          ? "P1: " + this.player1.name
          : "P2: " + this.player2.name
      }`,
      false,
      false,
      true
    );
    startOfTheGame.showModal();
  }

  // HOVER TO PREVIEW, CLICK TO MAKE A DECISION
  makeDecision() {
    console.log("make decision");
    const playerOne = document.querySelector(".game .player1");
    const playerTwo = document.querySelector(".game .player2");

    if (this.activePlayer === 1) {
      playerOne.classList.add("active");
      playerTwo.classList.add("inactive");
    } else {
      playerOne.classList.add("inactive");
      playerTwo.classList.add("active");
    }

    // PREVIEW YOUR DECISION
    const resetHover = (hover) => (hover.style.backgroundImage = null);
    ticTacFields.forEach((field) => {
      const mouseOut = () => resetHover(field);
      field.addEventListener("mouseout", mouseOut);

      const mouseOver = () => {
        ticTacFields.forEach((field) => resetHover(field));
        if (
          field.innerHTML !== '<div class="o"></div>' &&
          field.innerHTML !== '<div class="x"></div>'
        ) {
          field.style.backgroundImage =
            this.activePlayer === 1
              ? "url(/assets/wo.png)"
              : "url(/assets/wx.png)";
        }
      };
      field.addEventListener("mouseover", mouseOver);

      //CLICK TO MAKE A DECISION

      const make = () => {
        if (
          field.innerHTML !== '<div class="o"></div>' &&
          field.innerHTML !== '<div class="x"></div>'
        ) {
          if (this.activePlayer === 1) {
            field.innerHTML = '<div class="o"></div>';
            this.activePlayer = 2;
            playerOne.classList.add("inactive");
            playerTwo.classList.remove("inactive");
            playerOne.classList.remove("active");
            playerTwo.classList.add("active");
          } else {
            field.innerHTML = '<div class="x"></div>';
            this.activePlayer = 1;
            playerOne.classList.add("active");
            playerOne.classList.remove("inactive");
            playerTwo.classList.remove("active");
            playerTwo.classList.toggle("inactive");
          }
        }
        Pregame.newGame.checkResult();
      };
      field.addEventListener("click", make);
    });
  }

  // CHECK IF SOMEONE WON
  checkResult() {
    console.log("check result");
    console.log("thispoints1: " + this.player1.name);
    console.log("thispoints2: " + this.points2);
    const rowA = Array.from(document.querySelectorAll(".rowA"));
    const rowB = Array.from(document.querySelectorAll(".rowB"));
    const rowC = Array.from(document.querySelectorAll(".rowC"));
    const rowD = Array.from(document.querySelectorAll(".rowD"));
    const rowE = Array.from(document.querySelectorAll(".rowE"));
    const colOne = Array.from(document.querySelectorAll(".colOne"));
    const colTwo = Array.from(document.querySelectorAll(".colTwo"));
    const colThree = Array.from(document.querySelectorAll(".colThree"));
    const colFour = Array.from(document.querySelectorAll(".colFour"));
    const colFive = Array.from(document.querySelectorAll(".colFive"));

    const whistle = new Audio("../assets/whistle.mp3");
    const goal = new Audio("../assets/goal.mp3");
    goal.volume = 0.2;
    whistle.volume = 0.2;

    const rowsAndCols = [
      rowA,
      rowB,
      rowC,
      rowD,
      rowE,
      colOne,
      colTwo,
      colThree,
      colFour,
      colFive,
    ];
    const crossA = [rowA[0], rowB[1], rowC[2], rowD[3], rowE[4]];
    const crossB = [rowA[4], rowB[3], rowC[2], rowD[1], rowE[0]];
    const allLines = [...rowsAndCols, crossA, crossB];

    const check = (line) => {
      console.log("Checkuję");
      // CIRCLE WON
      if (
        line.every((element) => element.innerHTML === '<div class="o"></div>')
      ) {
        console.log("Wygrało kółko");
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        ticTacFields.forEach((field) => (field.style.backgroundImage = null));
        this.music === "on" ? goal.play() : "";
        if (this.points1 < this.numberOfGames - 1) {
          console.log("Jest mniejszy");
          this.points1++;
          playerOneTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
        } else {
          console.log("jest większy");
          this.points1++;
          this.music === "on" ? whistle.play() : "";
          const player1won = new Modal(
            `${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}`,
            true,
            true,
            false
          );
          player1won.showModal();

          playerOneTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
        }
      }
      // CROSS WON
      else if (
        line.every((element) => element.innerHTML === '<div class="x"></div>')
      ) {
        console.log("Wygrał krzyżyk");
        this.music === "on" ? goal.play() : "";
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        ticTacFields.forEach((field) => (field.style.backgroundImage = null));
        if (this.points2 < this.numberOfGames - 1) {
          this.points2++;
          playerTwoTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
        } else {
          this.points2++;
          this.music === "on" ? whistle.play() : "";
          playerTwoTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
          const player2won = new Modal(
            `${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}`,
            true,
            true,
            false
          );
          player2won.showModal();
        }
      }
      // TIE
      else if (
        allLines.every(
          (arr) =>
            arr.some(
              (element) => element.innerHTML === '<div class="o"></div>'
            ) &&
            arr.some((element) => element.innerHTML === '<div class="x"></div>')
        )
      ) {
        console.log("Mamy remis");
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        ticTacFields.forEach((field) => (field.style.backgroundImage = null));
      }
    };

    allLines.forEach((arr) => check(arr));
    result.textContent = `${this.points1}:${this.points2}`;
  }
}

// Responsywność
// SCSS
