import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [visibleSections, setVisibleSections] = useState({
    characters: true,
    numbers: true,
    highestAlphabet: true,
  });

  const handleSubmit = async () => {
    setError(null);
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post(
        "https://bajaj-backend-cnwg06uii-mohd-taseen-iqbals-projects.vercel.app/bfhl",
        parsedInput
      );
      setResponse(res.data);
    } catch (err) {
      setError("Invalid JSON input or request failed");
      console.error("Error submitting JSON:", err);
    }
  };

  const toggleVisibility = (section) => {
    setVisibleSections({
      ...visibleSections,
      [section]: !visibleSections[section],
    });
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON here"
      ></textarea>
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {response && (
        <div>
          <div>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.characters}
                onChange={() => toggleVisibility("characters")}
              />
              Characters
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.numbers}
                onChange={() => toggleVisibility("numbers")}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                checked={visibleSections.highestAlphabet}
                onChange={() => toggleVisibility("highestAlphabet")}
              />
              Highest Alphabet
            </label>
          </div>
          {visibleSections.characters && (
            <div>
              <h2>Characters</h2>
              <p>{response.alphabets.join(", ")}</p>
            </div>
          )}
          {visibleSections.numbers && (
            <div>
              <h2>Numbers</h2>
              <p>{response.numbers.join(", ")}</p>
            </div>
          )}
          {visibleSections.highestAlphabet && (
            <div>
              <h2>Highest Alphabet</h2>
              <p>{response.highest_alphabet.join(", ")}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
