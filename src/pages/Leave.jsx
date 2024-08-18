import "./Leave.css";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDoorOpen, faX, faXmark} from "@fortawesome/free-solid-svg-icons";

export default function ({setPage}) {

    const [hoverEffect, setHoverEffect] = useState(-1);

    return (
        <>
            <div className="leave_site">
                <h2>Seite verlassen?</h2>
            </div>

            <div className="leave_row">
                <button className={"leave"} onClick={() => window.close()} onMouseEnter={() => setHoverEffect(1)}
                        onMouseLeave={() => setHoverEffect(-1)}>
                    {hoverEffect === 1 && <FontAwesomeIcon icon={faDoorOpen} />}
                    {hoverEffect !== 1 && <h2>Verlassen</h2>}
                </button>
                <button className="cancel" onClick={() => setPage("MainMenu")} onMouseEnter={() => setHoverEffect(2)}
                        onMouseLeave={() => setHoverEffect(-1)}>
                    {hoverEffect === 2 && <FontAwesomeIcon icon={faXmark} />}
                    {hoverEffect !== 2 && <h2>Abbrechen</h2>}
                </button>
            </div>
        </>
    )
}

