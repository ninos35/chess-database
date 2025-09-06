import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import Button from "../Button/Button";
import type { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { Chess } from "chess.js";
import SaveGameForm from "../SaveGameForm/SaveGameForm";

interface Props {
  moves: string[];
  setMoves: React.Dispatch<React.SetStateAction<string[]>>;
  viewGame: null | any;
  onGameOver?: (isOver: boolean) => void;
}

function ChessBoardWrapper({ moves, setMoves, viewGame, onGameOver }: Props) {
  const [boardOri, setBoardOrientation] = useState<"white" | "black">("white");
  const [game, setGame] = useState(new Chess());
  const [pos, setPosition] = useState(game.fen());
  const [pgn, setPgn] = useState("");
  const [restartGame, setRestartGame] = useState(false);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);

  const startNewGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.fen());

    setMoves([]);
    setPgn("");
    setRestartGame(false);
  };

  const changeOrientation = () => {
    if (boardOri === "white") {
      setBoardOrientation("black");
    } else {
      setBoardOrientation("white");
    }
  };

  const onPieceDrop = (
    sourceSquare: Square,
    targetSquare: Square,
    piece: Piece
  ): boolean => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
    });

    setGame(game);

    setPgn(game.pgn());
    setPosition(game.fen());
    setMoves(game.history());
    return true;
  };

  const writeMove = (piece: Piece, targetSquare: Square) => {
    const myPiece = piece.toString()[1];

    let newMove = "";

    if (myPiece !== "P") {
      newMove = myPiece;
    }
    newMove = newMove + targetSquare;
    if (game.isCheckmate()) {
      newMove = newMove + "#";
    } else if (game.isCheck()) {
      newMove = newMove + "+";
    }

    return;
  };
  const undoMove = () => {
    const undo = game.undo();
    if (undo) {
      setPosition(game.fen());

      const newMoves = moves.slice(0, -1);
      moves = newMoves;
      setMoves(game.history());

      setGame(game);
      setCurrentMoveIndex(currentMoveIndex - 1);
    }
  };
  const makeMove = () => {
    const parsedMoves = JSON.parse(viewGame.moves);
    if (currentMoveIndex >= parsedMoves.length) return;

    const move = parsedMoves[currentMoveIndex];
    const result = game.move(move);

    if (result) {
      setGame(game);
      setPosition(game.fen());
      setCurrentMoveIndex(currentMoveIndex + 1);
    } else {
      console.warn("Invalid move:", move);
    }
  };

  useEffect(() => {
    if (restartGame) {
      startNewGame();
    }
  }, [restartGame]);
  useEffect(() => {
    if (onGameOver) {
      onGameOver(game.isGameOver());
    }
  }, [game.fen()]);

  return (
    <div id="chessboard-wrapper">
      {
        <>
          <Chessboard
            boardOrientation={boardOri}
            position={pos}
            onPieceDrop={onPieceDrop}
            customDarkSquareStyle={{ backgroundColor: "#3662c2" }}
            customLightSquareStyle={{ backgroundColor: "#d1d1d1" }}
          />
          <div className="btn-group" id="board-group">
            <Button onClick={changeOrientation}>Okreni ploču</Button>
            {viewGame === null && (
              <>
                <Button onClick={startNewGame}>Nova partija</Button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal"
                >
                  Spremi partiju
                </button>{" "}
                <Button onClick={undoMove}>Vrati potez</Button>
              </>
            )}
            {viewGame && (
              <>
                <Button onClick={undoMove}>Vrati potez</Button>
                <Button onClick={makeMove}>Sljedeći potez</Button>
              </>
            )}
          </div>

          <div
            className="modal fade"
            id="Modal"
            tabIndex={-1}
            aria-labelledby="ModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="ModalLabel">
                    Unesi podatke
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <SaveGameForm
                    moves={moves}
                    pgn={game.pgn()}
                    fen={game.fen()}
                    restartGame={restartGame}
                    setRestartGame={setRestartGame}
                  ></SaveGameForm>
                </div>
              </div>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default ChessBoardWrapper;
