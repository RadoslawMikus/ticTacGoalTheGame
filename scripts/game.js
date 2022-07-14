// --------------------
// GAME CLASS
// --------------------

const ticTacFields = document.querySelectorAll(".ticTacField");

class Game {
  constructor(active, howManyGames, player1, player2) {
    this.activePlayer = active;
    this.howManyGames = howManyGames;
    this.player1 = player1;
    this.player2 = player2;
    this.points1 = 0;
    this.points2 = 0;
  }

  // HIDE PREGAME AND SHOW GAME
  start() {
    document
      .querySelectorAll(".pregame, .game")
      .forEach((el) => el.classList.toggle("d-none"));
    this.makeDecision();
  }

  // HOVER TO PREVIEW, CLICK TO MAKE A DECISION
  makeDecision() {
    // PREVIEW YOUR DECISION
    const resetHover = (hover) => (hover.style.backgroundImage = null);

    ticTacFields.forEach((field) => {
      field.addEventListener("mouseout", () => resetHover(field));

      field.addEventListener("mouseover", () => {
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
      });

      //CLICK TO MAKE A DECISION
      field.addEventListener("click", () => {
        if (
          field.innerHTML !== '<div class="o"></div>' &&
          field.innerHTML !== '<div class="x"></div>'
        ) {
          if (this.activePlayer === 1) {
            // CHANGE ACTIVE PLAYER TO 2
            field.innerHTML = '<div class="o"></div>';
            this.activePlayer = 2;
            //DODAĆ STYL ACTIVE DO PLAYER2
            // DODAĆ STYL INACTIVE DO PLAYER1
          } else {
            // CHANGE ACTIVE PLAYER TO 1
            field.innerHTML = '<div class="x"></div>';
            this.activePlayer = 1;
            //DODAĆ STYL ACTIVE DO PLAYER1
            // DODAĆ STYL INACTIVE DO PLAYER2
          }
        }

        this.checkResult();
      });
    });
  }

  // CHECK IF SOMEONE WON
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
    const result = document.querySelector(".middle");

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
      // CIRCLE WON
      if (
        line.every((element) => element.innerHTML === '<div class="o"></div>')
      ) {
        console.log("Wygrało kółko");
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        if (this.points1 < this.howManyGames - 1) {
          this.points1++;
        } else {
          this.points1++;
          console.log(
            `${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}`
          );
          setTimeout(() => {});
          // this.points1 = 0;
          // this.points2 = 0;
        }
      }
      // CROSS WON
      else if (
        line.every((element) => element.innerHTML === '<div class="x"></div>')
      ) {
        console.log("Wygrał krzyżyk");
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
        if (this.points2 < this.howManyGames - 1) {
          this.points2++;
        } else {
          this.points2++;
          console.log(
            `${this.player1.name} ${this.points1}:${this.points2} ${this.player2.name}`
          );
          // this.points1 = 0;
          // this.points2 = 0;
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
      }
    };

    allLines.forEach((arr) => check(arr));
    result.textContent = `${this.points1}:${this.points2}`;
  }
}
// Napisać przełączanie aktywnego gracza
// Połączyć to z pregame
// Napisać aktualizację wyniku
// Napisać afterGame (modal, gdzie można kliknąć zagraj ponownie albo wrócić do wyboru postaci)
// Dodać funkcjonalność dla wygranej
// Dodać funkcjonalność dla przegranej
// Dodać funkcjonalność dla remisu
// PLAY GOAL SOUND
// PLAY LAST WHISTLE
// BUTTON TO DISABLE MUSIC
// Responsywność
// SCSS
