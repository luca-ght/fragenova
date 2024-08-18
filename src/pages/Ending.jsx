import "./Ending.css";
import Navigation from "../Navigation.jsx";
import {useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faHome, faRotateRight, faXmark} from "@fortawesome/free-solid-svg-icons";


export default function ({correctAnswers, questionAmount, setPage, setCorrectAnswers}) {
    const [color, setColor] = useState("#000");

    const prozent = Math.round(correctAnswers/questionAmount*100);

    const [hoverEffect, setHoverEffect] = useState(-1);

    const switchToInGame = () => {
        setPage("InGame");
        setCorrectAnswers(0);
    }

    useEffect(() => {
        if (prozent === 100) setColor("rgba(17,82,11,");
        if (prozent <= 99) setColor("rgba(26,251,6,");
        if (prozent <= 74) setColor("rgba(222,226,10,");
        if (prozent <= 49) setColor("rgba(203,158,0,");
        if (prozent <= 24) setColor("rgba(222,67,0,");
        if (prozent === 0) setColor("rgba(255,0,0,");
    }, []);

    return (
        <>
        <div className="percent">
            <h2 style={{color: color + "0.3)", WebkitTextStrokeColor: color + "1)"}}>{prozent}%</h2>
            <h3>{correctAnswers}/{questionAmount}</h3>
        <h3>Richtig</h3>
        </div>
            <div className="select_row">
                <button className={"again"} onClick={() => switchToInGame()} onMouseEnter={() => setHoverEffect(1)}
                        onMouseLeave={() => setHoverEffect(-1)}>
                    {hoverEffect === 1 && <FontAwesomeIcon icon={faRotateRight} />}
                    {hoverEffect !== 1 && <h2>Erneut</h2>}
                </button>
                <button className="main" onClick={() => setPage("MainMenu")} onMouseEnter={() => setHoverEffect(2)}
                        onMouseLeave={() => setHoverEffect(-1)}>
                    {hoverEffect === 2 && <FontAwesomeIcon icon={faHome} />}
                    {hoverEffect !== 2 && <h2>Hauptmenü</h2>}
                </button>
            </div>
        </>
    )
}