const loadFederatedRemote = (url) => {
    const element = document.createElement("script");
    element.src = url;
    element.type = "text/javascript";
    element.async = true;

    element.onload = () => console.log(`Dynamic Script Loaded: ${url}`)
    element.onerror = () => console.log(`ERROR loading Script: ${url}`)

    document.head.appendChild(element);
}


const dynamicImport = async (path) => {
    const [scope, url] = path.split('/');

    //We need to ensure the scope is propoerly loaded onto the page...
    const waitForScope = timeToDelay => new Promise((resolve, reject) => {
        if (!timeToDelay) {
            timeToDelay = 0;
        }

        /**
         * A recursive function to check for the existance of the window[scope] variable.
         *   This will eventually reject the promise if it has to wait for a certain 
         *   period of time. 
         */
        const check = timeToDelay => setTimeout(() => {
            if (window[scope]) {
                resolve()
            }
            else {
                if (timeToDelay > 2048) {
                    reject()
                    // throw new Error("Unable to load module")
                }
                else {
                    check(timeToDelay * 2)
                }
            }
        }, timeToDelay)

        check(timeToDelay + 1)
    });
    await waitForScope(); // wait for the scope to be loaded.

    
    const container = window[scope];

    /**
     * This section of code doesn't work as intended. I'm hoping to create a shared scope here but the versions of React don't synchronize
     */
    container.init({
        "react": () => Promise.resolve({
            "17.0.2": {
                get: ()=> Promise.resolve(()=>require("react")),
                loaded: false,
                from: "dar"
            }
        }),
        "react-dom": () => Promise.resolve({
            "17.0.2": {
                get: ()=> Promise.resolve(()=>require("react-dom")),
                loaded: false,
                from: "dar"
            }
        }),
        // "react-dom": () => Promise.resolve( () => require("react-dom") ),
    })

    return container.get('./' + url).then((factory) => {
        const Module = factory();

        if (Module.default) {
            return Module.default;
        }
        else {
            return Module;
        }
    })


}

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
const elementReady = (selector) => {
    return new Promise((resolve, reject) => {
      const el = document.querySelector(selector);
      if (el) {resolve(el);}
      new MutationObserver((mutationRecords, observer) => {
        // Query for elements matching the specified selector
        Array.from(document.querySelectorAll(selector)).forEach((element) => {
          resolve(element);
          //Once we have resolved we don't need the observer anymore.
          observer.disconnect();
        });
      })
        .observe(document.documentElement, {
          childList: true,
          subtree: true
        });
    });
  }
  
  /*  This logic is needed because we're not using webpack 5 yet */
const sharedExports = {};

const shareExports = (exports, remote = "") => {
  /*
  exports is expected to be an object
  {
    "react": ()=> Promise.resolve(()=>require("react"))
  }
   The value should be:
  - a function that returns a promise
  - that promise should resolve to a function
  - that function should return the module
  */
  // if no remote is given "" is used and that will apply to all remote entries
  // This method is additive, there is no "unshare"
  sharedExports[remote] = Object.assign(sharedExports[remote] || {}, exports);
};

const applySharedExports = remote => {
  if (typeof window !== "undefined") {

    // Given a remote entry, we gather all the modules that the host application has already
    const mergedExports = { ...(sharedExports === null || sharedExports === void 0 ? void 0 : sharedExports[""]),
      // apply globally shared modules
      ...(sharedExports === null || sharedExports === void 0 ? void 0 : sharedExports[remote]) // modules shared only for this remote entry

    }; // Logic for applying @ScriptedAlchemy  
    // check if using new webpack API

    if (window[remote].init) {
      Object.assign(mergedExports, Object.entries(mergedExports).reduce((acc, [key, value]) => {
        if (typeof value === "function") {
          let version = "17.0.2";

        //   try {
        //     // eslint-disable-next-line
        //     version = value().version;
        //   } catch (error) {
        //     console.log("Error retrieving shared version", error);
        //   }

          Object.assign(acc, {
            [key]: {
              [version]: {
                get: value,
                loaded: true,
                from: "dar"
              }
            }
          });
        }

        return acc;
      }, {}));
    }

    
  }
  return mergedExports;

};



export { loadFederatedRemote, dynamicImport, elementReady, shareExports, applySharedExports };

