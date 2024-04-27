import GameState from "./GameState";

function Resetgame({ gameState, onReset }) {
  if (gameState === GameState.inProgress) {
    return;
  }
  return (
    <button className="reset-button" onClick={onReset}>
      Reset
    </button>
  );
}

export default Resetgame;
