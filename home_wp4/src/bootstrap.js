//Start bootstrapping your app here

import {loadFederatedRemote, dynamicImport, elementReady, shareExports, applySharedExports} from "./MFE"
import {registerApplication, start} from "single-spa";

loadFederatedRemote("http://localhost:4002/remoteEntry.js");
loadFederatedRemote("http://localhost:4003/remoteEntry.js");


// shareExports(  {
//   "react": ()=> Promise.resolve(()=>require("react")),
//   "react-dom": () => Promise.resolve( () => require("react-dom") )
// })


// setTimeout( () => {
//   applySharedExports("app2");
// }, 0);

// registerApplication(
//   'app3_fruit',
//   // () => elementReady("#single-spa-application\\:app3_fruit").then(() => dynamicImport('app3/Apple')),
//   () => elementReady("#single-spa-application\\:app3_fruit").then(() => dynamicImport('app3/Apple')),
//   location => location.pathname.startsWith('/')
// )

registerApplication({
  name: 'app2',
  app: () => dynamicImport("app2/App"),
  activeWhen: ['/']
})

registerApplication({
  name: 'app3',
  app: () => dynamicImport("app3/App"),
  activeWhen: ['/']
})


start();
