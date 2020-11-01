import "office-ui-fabric-react/dist/css/fabric.min.css";
import App from "./components/App";
import { AppContainer } from "react-hot-loader";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore } from "redux";
import { reducer } from './components/todo/reducers';
import {composeWithDevTools} from "redux-devtools-extension";
import { Provider } from "react-redux";

/* global AppCpntainer, Component, document, Office, module, require */
const store = createStore(reducer, {}, composeWithDevTools());

initializeIcons();

let isOfficeInitialized = false;

const title = "Meeting Machine";

const render = Component => {
  ReactDOM.render(
      <Provider store={store}>
      <Component title={title} isOfficeInitialized={isOfficeInitialized} />
      </Provider>,
    document.getElementById("container")
  );
};

/* Render application after Office initializes */
Office.initialize = () => {
  isOfficeInitialized = true;
  render(App);
};

render(App);

if ((module as any).hot) {
  (module as any).hot.accept("./components/App", () => {
    const NextApp = require("./components/App").default;
    render(NextApp);
  });
}
