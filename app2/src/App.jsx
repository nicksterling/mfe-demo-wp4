import React, { useState } from "react";
import Level1 from "./Level1";

import AppContext from "./AppContext"

export default function App() {
    const [count, setCount] = useState(0)

    return (
        <AppContext.Provider
            value={{
                count,
                setCount
            }}
        >
            <div style={{"border":"solid 3px green", "padding": "10px", "margin": "10px"}} >   
                <h1>Component from APP 2</h1>
                <p>App 2 ships with React 17.0.0</p>
                <p>Currently using React {React.version}</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me: {count}
                </button>
                <Level1 />
            </div>
        </AppContext.Provider>
    );
}
