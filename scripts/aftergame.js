class Aftergame {
  // RESET EVERYTHING AND START A NEW GAME
  // WITH CHOOSING PLAYERS
  static newGame() {
    startButton.setAttribute("disabled", "disabled");
    toggler(".pregame, .game, .overlay, .modal");
    document
      .getElementsByName("howManyGames")
      .forEach((el) => (el.checked = false));
    Pregame.numberOfGames = undefined;
    console.log(this.activePlayer);
    stadium.pause();
    stadium.currentTime = 0;
    fighters.forEach((fighter) => {
      fighter.classList.remove("chosen");
      playerNumber.forEach((label) => (label.textContent = ""));
    });
  }

  // JUST RESET POINTS AND START AGAIN
  // WITH SAME PLAYERS, SAME RULES
  static rematch() {
    Pregame.newGame.points1 = 0;
    Pregame.newGame.points2 = 0;
    resetResult();
    toggler(".overlay, .modal");
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
}
