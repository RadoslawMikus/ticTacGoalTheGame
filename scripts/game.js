const ticTacFields = document.querySelectorAll(".ticTacField");
const playerOne = document.querySelector(".game .player1");
const playerTwo = document.querySelector(".game .player2");
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
  // ---------------------------
  start() {
    resetResult();
    toggler(".pregame, .game");
    this.music === "on" ? stadium.play() : "";
    document
      .querySelector(".player1 > img")
      .setAttribute("src", this.player1.img);
    document.querySelector(".name1").textContent = this.player1.name;
    document
      .querySelector(".player2 > img")
      .setAttribute("src", this.player2.img);
    document.querySelector(".name2").textContent = this.player2.name;

    this.makeDecision();

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

  // CHECK WHO IS ACTIVE AND ADD STYLES
  // -----------------------------------
  checkActive() {
    [playerOne, playerTwo].forEach((el) =>
      el.classList.remove("active", "inactive")
    );
    if (this.activePlayer === 1) {
      playerOne.classList.add("active");
      playerTwo.classList.add("inactive");
    } else if (this.activePlayer === 2) {
      playerOne.classList.add("inactive");
      playerTwo.classList.add("active");
    }
  }

  // HOVER TO PREVIEW, CLICK TO MAKE A DECISION
  // -------------------------------------------
  makeDecision() {
    this.checkActive();
    // PREVIEW YOUR DECISION
    const resetHover = (hover) => (hover.style.backgroundImage = null);
    ticTacFields.forEach((field) => {
      const mouseOut = () => resetHover(field);

      const mouseOver = () => {
        ticTacFields.forEach((field) => resetHover(field));
        if (
          field.innerHTML !== '<div class="o"></div>' &&
          field.innerHTML !== '<div class="x"></div>'
        ) {
          field.style.backgroundImage =
            Pregame.newGame.activePlayer === 1
              ? "url(/assets/wo.png)"
              : "url(/assets/wx.png)";
        }
      };

      //CLICK TO MAKE A DECISION
      const make = () => {
        if (
          field.innerHTML !== '<div class="o"></div>' &&
          field.innerHTML !== '<div class="x"></div>'
        ) {
          if (Pregame.newGame.activePlayer === 1) {
            field.innerHTML = '<div class="o"></div>';
            Pregame.newGame.activePlayer = 2;
            playerOne.classList.add("inactive");
            playerTwo.classList.remove("inactive");
            playerOne.classList.remove("active");
            playerTwo.classList.add("active");
          } else {
            field.innerHTML = '<div class="x"></div>';
            Pregame.newGame.activePlayer = 1;
            playerOne.classList.add("active");
            playerOne.classList.remove("inactive");
            playerTwo.classList.remove("active");
            playerTwo.classList.toggle("inactive");
          }
        }
        Pregame.newGame.checkResult();
      };

      if (Pregame.initialized === undefined) {
        field.addEventListener("mouseover", mouseOver);
        field.addEventListener("mouseout", mouseOut);
        field.addEventListener("click", make);
      }
    });
  }

  // CHECK THE RESULT (IF WON, LOST, TIED)
  checkResult() {
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
      const clearFields = () => {
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        ticTacFields.forEach((field) => (field.style.backgroundImage = null));
      };
      // CIRCLE WON
      if (
        line.every((element) => element.innerHTML === '<div class="o"></div>')
      ) {
        this.points1++;
        this.music === "on" ? goal.play() : "";
        clearFields();
        if (this.points1 === this.numberOfGames) {
          this.music === "on" ? whistle.play() : "";
          const player1won = new Modal(
            `<span class="longMessage">${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}</span><span class="shortMessage">${this.player1.name} won!</span>`,
            true,
            true,
            false
          );
          player1won.showModal();
        }
      }
      // CROSS WON
      else if (
        line.every((element) => element.innerHTML === '<div class="x"></div>')
      ) {
        this.points2++;
        this.music === "on" ? goal.play() : "";
        clearFields();
        if (this.points2 === this.numberOfGames) {
          this.music === "on" ? whistle.play() : "";
          const player2won = new Modal(
            `<span class="longMessage">${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}</span><span class="shortMessage">${this.player2.name} won!</span>`,
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
        clearFields();
        const tieModal = new Modal(
          `No more moves possible!`,
          false,
          false,
          true
        );
        tieModal.showModal();
      }
    };

    allLines.forEach((arr) => check(arr));
    result.textContent = `${this.points1}:${this.points2}`;

    if (this.numberOfGames <= 5) {
      [playerOneTrophies, playerTwoTrophies].forEach(
        (el) => (el.innerHTML = "")
      );
      for (let i = 0; i < this.points1; i++) {
        playerOneTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
      }
      for (let i = 0; i < this.points2; i++) {
        playerTwoTrophies.innerHTML += `<img class="point" src="assets/point.png" />`;
      }
    }
  }
}
