class Aftergame {
  static newGame() {
    // document
    //   .querySelectorAll(".pregame, .game, .overlay, .modal")
    //   .forEach((el) => el.classList.toggle("d-none"));
    startButton.setAttribute("disabled", "disabled");

    toggler(".pregame, .game, .overlay, .modal");

    document.getElementsByName("howManyGames").forEach((el) => {
      el.checked = false;
    });

    Pregame.numberOfGames = undefined;
    stadium.pause();
    stadium.currentTime = 0;

    fighters.forEach((fighter) => {
      fighter.classList.remove("chosen");
      playerNumber.forEach((tekst) => (tekst.textContent = ""));
    });
    // Pregame.newGame = null;
  }

  static rematch() {
    Pregame.newGame.points1 = 0;
    Pregame.newGame.points2 = 0;
    result.textContent = "0:0";
    [playerOneTrophies, playerTwoTrophies].forEach((el) => (el.innerHTML = ""));
    // playerTwoTrophies.innerHTML = "";

    // document
    //   .querySelectorAll(".overlay, .modal")
    //   .forEach((el) => el.classList.toggle("d-none"));
    toggler(".overlay, .modal");
  }
}
