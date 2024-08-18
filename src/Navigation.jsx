import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeftLong, faPalette, faDoorOpen, faDoorClosed} from "@fortawesome/free-solid-svg-icons";
import "./Navigation.css";
import {useEffect, useState} from "react";

export default function ({page, setPage, goBack}) {

    const [navigationOff, setNavigationOff] = useState(false);
    const [colorsOff, setColorsOff] = useState(false);

    const [doorOpen, setDoorOpen] = useState(false);

    useEffect(() => {
        if (page === "Leave" || page === "Ending") {
            setNavigationOff(true);
        } else {
            setNavigationOff(false);
        }

        if (page === "InGame" || page === "Color" || page === "Impressum" || page === "Privacy") {
            setColorsOff(true);
        } else {
            setColorsOff(false);
        }
    }, [page]);

    return (
        <nav>
            {!navigationOff && <>
                <button className="icon" onClick={() => setPage(page === "MainMenu" ? "Leave" : "MainMenu")}
                        onMouseEnter={() => setDoorOpen(true)} onMouseLeave={() => setDoorOpen(false)}>
                    <FontAwesomeIcon icon={page === "MainMenu" ? (doorOpen ? faDoorOpen : faDoorClosed) : faArrowLeftLong}/>
                </button>
                {!colorsOff && <button className="icon color-icon" onClick={() => setPage("Color")}>
                    <FontAwesomeIcon icon={faPalette}/>
                </button>}
            </>}
            </nav>);
}