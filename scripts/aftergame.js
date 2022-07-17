class Aftergame {
  // RESET EVERYTHING AND START A NEW GAME
  // WITH CHOOSING PLAYERS
  static newGame() {
    [playerOne, playerTwo].forEach((el) =>
      el.classList.remove("active", "inactive")
    );
    startButton.setAttribute("disabled", "disabled");
    toggler(".pregame, .game, .overlay, .modal");
    document
      .getElementsByName("howManyGames")
      .forEach((el) => (el.checked = false));
    Pregame.numberOfGames = undefined;
    Pregame.activePlayer = undefined;
    Pregame.newGame.activePlayer = undefined;

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
        Pregame.newGame.activePlayer === 1
          ? "P1: " + Pregame.newGame.player1.name
          : "P2: " + Pregame.newGame.player2.name
      }`,
      false,
      false,
      true
    );
    startOfTheGame.showModal();
  }
}
