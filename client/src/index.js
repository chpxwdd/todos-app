import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import "./styles/todos.scss";
import {App} from "./App";

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(<App />);
