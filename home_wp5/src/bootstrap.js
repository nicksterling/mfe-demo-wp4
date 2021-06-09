//Start bootstrapping your app here
import { registerApplication, start } from 'single-spa';


registerApplication({
    name: 'app3',
    app: () => import("app3/App"),
    activeWhen: ['/']
})


registerApplication({
    name: 'app2',
    app: () => import("app2/App"),
    activeWhen: ['/']
})


start();