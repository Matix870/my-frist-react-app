import { useState } from "react";

const COLORS = [
  { name: "Czerwony", value: "#f97316" },
  { name: "Pomarańczowy", value: "#f59e0b" },
  { name: "Żółty", value: "#eab308" },
  { name: "Zielony", value: "#22c55e" },
  { name: "Niebieski", value: "#3b82f6" },
];

const EMOJIS = ["\u{1F600}", "\u{1F4DA}", "\u{2705}", "\u{1F6D2}", "\u{1F4A1}"];

function InputForm({ onAddTask, selectedColor, onColorChange }) {
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState("");
  const [emoji, setEmoji] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) {
      return;
    }

    onAddTask(inputValue, description.trim(), emoji.trim());
    setInputValue("");
    setDescription("");
    setEmoji("");
  };

  return (
    <section className="input-form-section">
      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Dodaj nowe zadanie..."
          className="task-input"
        />
        <button type="submit" className="task-submit-button">
          Dodaj
        </button>
      </form>

      <textarea
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Opis (opcjonalnie)"
        className="task-description-input"
      />

      <div className="emoji-picker-row">
        <span className="row-label">Ikona:</span>
        <div className="emoji-list" role="group" aria-label="Wybierz ikonę zadania">
          {EMOJIS.map((emojiValue) => (
            <button
              key={emojiValue}
              onClick={() => setEmoji(emojiValue)}
              className={`emoji-button ${emoji === emojiValue ? "is-active" : ""}`}
              type="button"
            >
              {emojiValue}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
          placeholder="lub wpisz ikonę"
          className="emoji-custom-input"
        />
      </div>

      <div className="color-row">
        <span className="row-label">Kolor:</span>
        <div className="color-list" role="group" aria-label="Wybierz kolor zadania">
          {COLORS.map((color) => (
            <button
              key={color.name}
              onClick={() => onColorChange(color.value)}
              title={color.name}
              style={{ backgroundColor: color.value }}
              className={`color-dot ${selectedColor === color.value ? "is-selected" : ""}`}
              type="button"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default InputForm;
