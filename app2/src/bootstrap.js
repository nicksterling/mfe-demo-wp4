// import React from "react";
// import ReactDOM from "react-dom";

// import App from "./App";

// ReactDOM.render(<App />, document.getElementById("root"));

import { registerApplication, start } from 'single-spa';

registerApplication({
    name: 'app',
    app: () => import("./App.singlespa"),
    activeWhen: ['/']
})

start()