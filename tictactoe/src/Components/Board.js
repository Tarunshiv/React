import Strike from "./Strike";
import Tile from "./Tile";

function Board({ tiles, onTileClick, playerTurn, strikeClass }) {
  const renderTile = (index, className) => (
    <Tile
      key={index}
      playerTurn={playerTurn}
      value={tiles[index]}
      onClick={() => onTileClick(index)}
      className={className}
    />
  );

  return (
    <div className="board">
      {renderTile(0, "right-border bottom-border")}
      {renderTile(1, "right-border bottom-border")}
      {renderTile(2, "bottom-border")}
      {renderTile(3, "right-border bottom-border")}
      {renderTile(4, "right-border bottom-border")}
      {renderTile(5, "bottom-border")}
      {renderTile(6, "right-border")}
      {renderTile(7, "right-border")}
      {renderTile(8, "")}
      <Strike strikeClass={strikeClass} />
    </div>
  );
}

export default Board;
