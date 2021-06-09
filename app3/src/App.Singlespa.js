import React from "react";
import ReactDOM from "react-dom";
import singleSpaReact from "single-spa-react";
import App from "./App"

const appLifecycle = singleSpaReact({
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

export const bootstrap = appLifecycle.bootstrap;
export const mount = appLifecycle.mount;
export const unmount = appLifecycle.unmount;