import "./App.css";
import LogInPage from "./components/LogInPage";
import MainPage from "./components/MainPage";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<LogInPage />} />
        <Route path="/mainPage" element={<MainPage />} />
      </Routes>
    </Fragment>
  );
}

export default App;
