import "./MovesList.css";

interface Props {
  moves: string[];
  viewGame: null | any;
}

function MovesList({ moves, viewGame }: Props) {
  if (moves.length != 0) {
    return (
      <>
        <div id="container">
          <div className="header">{viewGame ? viewGame.white : "BIJELI"}</div>
          <div className="header">{viewGame ? viewGame.black : "CRNI"}</div>
          <div id="moves">
            {Array.from({ length: Math.ceil(moves.length / 2) }).map((_, i) => (
              <>
                <div>{moves[i * 2] ?? ""}</div>
                <div className="moveNumber">{`${i + 1}. `}</div>
                <div>{moves[i * 2 + 1] ?? ""}</div>
              </>
            ))}
          </div>
        </div>
      </>
    );
  } else
    return (
      <div id="text">
        <li>Na ploči unesite partiju</li>
        <li>
          Moguće je mijenjati perspektivu ploče na <strong>"Okreni ploču"</strong>
        </li>
        <li>
          Nakon unošenja partije, spremiti je na <strong>"Spremi partiju"</strong>
        </li>
        <li>U prozoru za spremanje unose se podaci o partiji</li>
        <li>
          Za unošenje nove partije, pritisnuti <strong>"Nova partija"</strong>
        </li>
      </div>
    );
}

export default MovesList;
