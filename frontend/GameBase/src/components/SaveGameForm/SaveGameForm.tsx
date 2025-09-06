import { useState } from "react";

interface Props {
  fen: string;
  moves: string[];
  pgn: string;
  restartGame: boolean;
  setRestartGame: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SaveGameForm({
  restartGame,
  setRestartGame,
  fen,
  moves,
  pgn,
}: Props) {
  const [formData, setFormData] = useState({
    White: "",
    WhiteELO: "",
    Black: "",
    BlackELO: "",
    result: "",
    date: "",
    info: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const gameData = {
      white: formData.White,
      black: formData.Black,
      white_elo: formData.WhiteELO || null,
      black_elo: formData.BlackELO || null,
      result: formData.result,
      date: formData.date,
      info: formData.info,
      moves: JSON.stringify(moves),
      pgn: pgn,
      fen: fen,
    };

    try {
      const response = await fetch("http://localhost:5000/newgame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(gameData),
      });

      if (!response.ok) {
        console.log(response);
      }

      const data = await response.json();
      // console.log("Saved game:", data);
      setFormData({
        White: "",
        WhiteELO: "",
        Black: "",
        BlackELO: "",
        result: "",
        date: "",
        info: "",
      });
      setRestartGame(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: "500px" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Bijeli</label>
          <input
            type="text"
            name="White"
            className="form-control"
            value={formData.White}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ELO bijelog (opcionalno)</label>
          <input
            type="text"
            name="WhiteELO"
            className="form-control"
            value={formData.WhiteELO}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Crni</label>
          <input
            type="text"
            name="Black"
            className="form-control"
            value={formData.Black}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">ELO crnog (opcionalno)</label>
          <input
            type="text"
            name="BlackELO"
            className="form-control"
            value={formData.BlackELO}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Rezultat</label>
          <select
            name="result"
            className="form-select"
            value={formData.result}
            onChange={handleChange}
            required
          >
            <option value="">Rezultat</option>
            <option value="1-0">1-0</option>
            <option value="0-1">0-1</option>
            <option value="1/2-1/2">1/2-1/2</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Datum</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Informacije o partiji (opcionalno)
          </label>
          <textarea
            name="info"
            className="form-control"
            value={formData.info}
            onChange={handleChange}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary">
          Spremi
        </button>
      </form>
    </div>
  );
}
