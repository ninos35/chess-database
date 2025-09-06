import { useState, useEffect } from "react";
import "./App.css";
import ChessBoardWrapper from "../components/ChessBoardWrapper/ChessBoardWrapper";
import MovesList from "../components/MovesList/MovesList";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function App() {
  const [moves, setMoves] = useState<string[]>([]);
  const [view, setView] = useState("home");
  const [selectedGame, setSelectedGame] = useState<any | null>(null);
  const [games, setGames] = useState<any[]>([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (view === "gamesList") {
      fetch("http://localhost:5000/games")
        .then((res) => res.json())
        .then((data) => setGames(data))
        .catch((err) => console.error("Error fetching games:", err));
    }
  }, [view]);

  return (
    <div id="main-container">
      <div id="header">
        <h1>GameBase</h1>
      </div>
      <div id="side">
        <div id="actions">
          <div onClick={() => setView("home")}>Početna stranica</div>
          <div
            onClick={() => {
              setView("board"), setMoves([]);
            }}
          >
            Unesi partiju
          </div>
          <div
            onClick={() => {
              setView("gamesList"), setSelectedGame(null);
            }}
          >
            Pregledaj partiju
          </div>
        </div>
      </div>
      <div id="main">
        {view == "home" && (
          <>
            <div id="landingPage">
              <h1>Dobrodošli u bazu šahovskih partija!</h1>
              <ul>
                <li>
                  Klikni na <strong>"Unesi partiju"</strong> za unos nove
                  partije.
                </li>
                <li>
                  Klikni na <strong>"Pregledaj partiju"</strong> za pregled
                  spremljenih partija.
                </li>
              </ul>
            </div>
          </>
        )}
        {view == "board" && (
          <>
            <ChessBoardWrapper
              onGameOver={setIsGameOver}
              moves={moves}
              setMoves={setMoves}
              viewGame={null}
            />
            <div id="board-side">
              <div>{isGameOver ? "Igra je gotova!" : " "}</div>
              <MovesList moves={moves} viewGame={null}></MovesList>
            </div>
          </>
        )}
        {view == "gamesList" && selectedGame === null && (
          <>
            <div id="gamesContainer">
              <div className="header">
                Odaberite partiju koju želite pregledati
              </div>
              <div id="listOfGames">
                {games.length === 0 && (
                  <div>Trenutno nema dostupnih partija</div>
                )}
                {games.map((game) => (
                  <div
                    key={game.game_id}
                    className="game"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div>
                      {game.white} vs {game.black}
                    </div>
                    <div>{game.result}</div>
                    <div>{new Date(game.date).toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {view == "gamesList" && selectedGame && (
          <>
            <ChessBoardWrapper
              moves={selectedGame.moves}
              setMoves={setMoves}
              viewGame={selectedGame}
            ></ChessBoardWrapper>
            <div id="board-side">
              <MovesList
                moves={
                  Array.isArray(selectedGame.moves)
                    ? selectedGame.moves
                    : JSON.parse(selectedGame.moves)
                }
                viewGame={selectedGame}
              />
            </div>
            <div id="gameData">
              <h3>Informacije o partiji</h3>
              <div className="gameRow">
                <span>Bijeli:</span>
                <span>
                  {selectedGame.white} (ELO:{" "}
                  {selectedGame.white_elo || "nije navedeno"})
                </span>
              </div>
              <div className="gameRow">
                <span>Crni:</span>
                <span>
                  {selectedGame.black} (ELO:{" "}
                  {selectedGame.black_elo || "nije navedeno"})
                </span>
              </div>
              <div className="gameRow">
                <span>Rezultat:</span>
                <span>{selectedGame.result}</span>
              </div>
              <div className="gameRow">
                <span>Odigrano datuma:</span>
                <span>{new Date(selectedGame.date).toLocaleDateString()}</span>
              </div>
              <div className="gameRow">
                <span>Dodatne informacije: </span>
                <div>
                  {selectedGame.game_data &&
                  selectedGame.game_data.trim().length > 0
                    ? selectedGame.game_data
                    : "Nema dodatnih informacija o partiji."}
                </div>{" "}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
