// --------------------
// GAME CLASS
// --------------------

const ticTacFields = document.querySelectorAll(".ticTacField");

class Game {
  constructor(active, player1, player2) {
    this.activePlayer = active;
    this.player1 = player1;
    this.player2 = player2;
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
            field.innerHTML = '<div class="o"></div>';
            this.activePlayer = 2;
          } else {
            field.innerHTML = '<div class="x"></div>';
            this.activePlayer = 1;
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
      }
      // CROSS WON
      else if (
        line.every((element) => element.innerHTML === '<div class="x"></div>')
      ) {
        console.log("Wygrał krzyżyk");
        rowsAndCols.forEach((arr) => arr.forEach((el) => (el.innerHTML = "")));
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
  }
}
// Dodać funkcjonalność dla wygranej
// Dodać funkcjonalność dla przegranej
// Dodać funkcjonalność dla remisu
// Napisać przełączanie aktywnego gracza
// Napisać aktualizację wyniku
// Połączyć to z pregame
// Napisać afterGame (modal, gdzie można kliknąć zagraj ponownie albo wrócić do wyboru postaci)
// Responsywność
// SCSS
