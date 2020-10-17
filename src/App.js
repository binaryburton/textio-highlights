import React, { useState, useEffect } from "react";
import { text, highlights } from "@textio/frontend-interview-data";
import "./App.css";
import { highlightRework, styledText } from "./utils";

console.log("Textio string:", text);
console.log("Textio highlights:", highlights);

function App() {
  const [newHighlights, setNewHighlights] = useState([]);
  const [newText, setNewText] = useState("");

  useEffect(() => {
    highlightRework(highlights).then((res) => {
      setNewHighlights(res);
      setNewText(styledText(text, res));
    });
  }, []);

  return (
    <div className="App">
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: newText }}
      ></div>


    </div>
  );
}

export default App;
