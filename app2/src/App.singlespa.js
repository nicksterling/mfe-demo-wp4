import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App"

const appLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    errorBoundary(err, info, props) {
        // https://reactjs.org/docs/error-boundaries.html
        return (
          <div>This renders when a catastrophic error occurs</div>
        );
      },
});

export const bootstrap = appLifecycles.bootstrap;
export const mount = appLifecycles.mount;
export const unmount = appLifecycles.unmount;