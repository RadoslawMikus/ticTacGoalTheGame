class Modal {
  constructor(message, showRematch, showNewGame, hideModal) {
    this.message = message;
    this.showRematch = showRematch;
    this.showNewGame = showNewGame;
    this.hideModal = hideModal;
  }

  // SHOW MODAL WITH NECCESSARY INFORMATIONS
  // OPTIONALLY WITH REMATCH AND NEW GAME BUTTONS
  showModal() {
    const modal = document.querySelector(".modal");
    modal.innerHTML = `<h1>${this.message}</h1>${
      this.showNewGame || this.showRematch
        ? `<span>${
            this.showRematch === true
              ? `<button id = "rematch">Show Rematch</button>`
              : ""
          }${
            this.showNewGame === true
              ? `<button id = "newGame">Show New Game</button>`
              : ""
          }</span>`
        : ""
    }`;
    toggler(".modal, .overlay");
    this.showNewGame
      ? document
          .querySelector("#newGame")
          .addEventListener("click", Aftergame.newGame)
      : "";

    this.showRematch
      ? document
          .querySelector("#rematch")
          .addEventListener("click", Aftergame.rematch)
      : "";

    this.hideModal === true
      ? setTimeout(() => {
          toggler(".modal, .overlay");
          modal.innerHTML = "";
        }, 2000)
      : "";
  }
}
