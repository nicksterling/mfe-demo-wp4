import React, { useContext, useState } from "react"
import AppContext from "./AppContext";

const Level2 = () => {
    
    const {count, setCount} = useContext(AppContext);

    return (
        <div>Count: {count}</div>
    );
}

export default Level2