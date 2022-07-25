## ticTacGoalTheGame ⭕️ / ❌

### Repository: https://github.com/davidsmith931/ticTacGoalTheGame
### Live Demo: https://davidsmith931.github.io/ticTacGoalTheGame/

The goal is to create a football version of the game TicTacToe (local multiplayer, 5x5).

&nbsp;

### ▶︎ &nbsp;Pregame
    “We’re going to start the game at nil-nil and go out and try to get some goals” 
    ~ Bryan Robson
    
- [X] Check if players and number of games are chosen,
- [X] Drew a random player to start the game,
- [X] Set music on and off with button,
- [X] Choose a "fighter" for both players,
- [X] Verify chosen "fighters" and create new player objects

### ⚽️ &nbsp;Game
    "Football is a simple game: 22 men chase a ball for 90 minutes and,
    in the end, the Germans always win"
    ~ Gary Lineker

- [X] Set number of games accordingly to pregame settings,
- [X] Show modal with "who starts" info,
- [X] Play music only if it's turned on,
- [X] Load names and photos of "fighters",
- [X] Show which player is active,
- [X] Display result (with trophies on bigger screens),
- [X] Hover to preview active move, click to make it,
- [X] Verify who won,
- [X] Verify if there's a chance to win, if not - reset and show TIE modal

### 🏁 &nbsp;Aftergame
    "I've never lost a game, I just ran out of time"
    ~ Michael Jordan

#### Rematch
- [X] Reset points, trophies and result,
- [X] Change active player,
- [X] Hide modal and show the game,
- [X] Start the game with same "fighters" and rules

#### New Game
- [X] Stop the music,
- [X] Remove active/inactive styles,
- [X] Reset to main menu,
- [X] Draw new active player,
- [X] Create a whole new game

### ❗️ &nbsp;Modal
    "I won't say we have to win. I won't put that pressure. But we can't lose"
    ~ José Mourinho

- [X] Create a modal class,
- [X] Show requested text message,
- [X] If neccessary, show Rematch button,
- [X] If neccessary, show New Game button,
- [X] Stay on top or hide after a few seconds

### 🔈 &nbsp;Others
    "Football is a game of mistakes. Whoever makes the fewest mistakes wins"
    ~ Johan Cruyff

- [X] Add goal, whistle and stadium sounds,
- [X] Style with SCSS,
- [X] Make it responsive
