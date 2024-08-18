import './App.css'
import Navigation from "./Navigation.jsx";
import MainMenu from "./pages/MainMenu.jsx";
import {useEffect, useState} from "react";
import Color from "./pages/Color.jsx";
import {hexToRgbA} from "./util.js";
import Leave from "./pages/Leave.jsx";
import InGame from "./pages/InGame.jsx";
import Ending from "./pages/Ending.jsx";
import Impressum from "./pages/Impressum.jsx";
import Privacy from "./pages/Privacy.jsx";

export default function () {
    const [page, setPage] = useState("MainMenu");
    const [questionAmount, setQuestionAmount] = useState(10);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const [currentColor, setCurrentColor] = useState(localStorage.getItem("primary-color") || "#000000");

    useEffect(() => {
        document.documentElement.style.setProperty("--primary-bg", hexToRgbA(currentColor) + "30%)");

        document.documentElement.style.setProperty("--primary-border", hexToRgbA(currentColor) + "50%)");
        localStorage.setItem("primary-color", currentColor);
    }, [currentColor]);

    const updatePage = (page) => {
        setPage(page);
    }

    const goBack = () => {
        setPage("MainMenu");
    }

    return (
      <>
          <Navigation page={page} setPage={updatePage} goBack={goBack}/>

          <main>
              {page === "MainMenu" && <MainMenu setPage={updatePage} setQuestionAmount={setQuestionAmount} />}
              {page === "Color" && <Color currentColor={currentColor} setCurrentColor={setCurrentColor} />}
              {page === "Leave" && <Leave setPage={setPage}/>}
              {page === "Impressum" && <Impressum/>}
              {page === "Privacy" && <Privacy/>}
              {page === "Ending" && <Ending correctAnswers={correctAnswers} questionAmount={questionAmount}
                                            setPage={setPage} setCorrectAnswers={setCorrectAnswers}/>}
              {page === "InGame" && <InGame setPage={updatePage} questionAmount={questionAmount}
                                            setCorrectAnswers={setCorrectAnswers} />}
          </main>

      </>
  )
}