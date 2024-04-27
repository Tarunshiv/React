import { useState, useEffect } from "react";
import Board from "./Board";
import Gameover from "./Gameover";
import GameState from "./GameState";
import Resetgame from "./Resetgame";
import players from "./Constants";

const { PLAYER_X, PLAYER_O } = players;

const winningCombinations = [
  { combo: [0, 1, 2], strikeClass: "strike-row-1" },
  { combo: [3, 4, 5], strikeClass: "strike-row-2" },
  { combo: [6, 7, 8], strikeClass: "strike-row-3" },
  { combo: [0, 3, 6], strikeClass: "strike-column-1" },
  { combo: [1, 4, 7], strikeClass: "strike-column-2" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [0, 4, 8], strikeClass: "strike-diagonal-1" },
  { combo: [2, 4, 6], strikeClass: "strike-diagonal-2" },
];

function checkWinner(tiles, setStrikeClass, setGameState) {
  for (const { combo, strikeClass } of winningCombinations) {
    const value_One = tiles[combo[0]];
    const value_Two = tiles[combo[1]];
    const value_Three = tiles[combo[2]];
    if (
      value_One !== null &&
      value_One === value_Two &&
      value_One === value_Three
    ) {
      setStrikeClass(strikeClass);
      if (value_One === PLAYER_X) {
        setGameState(GameState.playerXWins);
      } else {
        setGameState(GameState.playerOWins);
      }
      return;
    }
  }
  const areAllTilesFilled = tiles.every((tile) => tile !== null);
  if (areAllTilesFilled) {
    setGameState(GameState.draw);
  }
}

function Tictactoe() {
  const [tiles, setTiles] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
  const [strikeClass, setStrikeClass] = useState();
  const [gameState, setGameState] = useState(GameState.inProgress);

  const handleTileClick = (index) => {
    if (gameState !== GameState.inProgress) {
      return;
    }
    if (tiles[index] !== null) {
      return;
    }
    const newTiles = [...tiles];
    newTiles[index] = playerTurn;
    setTiles(newTiles);
    playerTurn === PLAYER_X ? setPlayerTurn(PLAYER_O) : setPlayerTurn(PLAYER_X);
  };

  const handleResetGame = () => {
    setGameState(GameState.inProgress);
    setTiles(Array(9).fill(null));
    setPlayerTurn(PLAYER_X);
    setStrikeClass(null);
  };

  useEffect(() => {
    checkWinner(tiles, setStrikeClass, setGameState);
  }, [tiles]);

  return (
    <div>
      <h1>Tic Tac Toe</h1>
      <Board
        playerTurn={playerTurn}
        tiles={tiles}
        onTileClick={handleTileClick}
        strikeClass={strikeClass}
      />
      <Gameover gameState={gameState} />
      <Resetgame gameState={gameState} onReset={handleResetGame} />
    </div>
  );
}
export default Tictactoe;
