import * as ReactDOMClient from "react-dom/client";
import App from "./components/app/app";
import { Provider } from "react-redux";
import store from "./services/store";
import { HashRouter } from "react-router-dom";

const container = document.getElementById("root") as HTMLElement;
const root = ReactDOMClient.createRoot(container!);

root.render(
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>,
);
