import React, { useState } from "react";

export default function App() {

  const [count, setCount] = useState(0);

  return (
    <div style={{"border":"solid 3px red", "padding": "10px", "margin": "10px"}} >
      <h1>Component from APP 3</h1>
      <p>App 2 ships with React 17.0.1</p>
      <p>Currently using React {React.version}</p>
      <button onClick={() => setCount(count + 1)}>
          Click me: {count}
      </button>
    </div>
  );
}
