import ReactDOM from "react-dom/client";
import App from "./App";
import "./sass/index.scss";
import { CountryContextProvider } from "./Context/Context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CountryContextProvider>
    <App />
  </CountryContextProvider>
);
