import "./Color.css";
import {hexToRgbA} from "../util.js";

const colors = ["#830000", "#4D009A", "#03318A", "#D6741A", "#FF00C7", "#05B4FF", "#DED609", "#000000", "#06573A"];
const color_names = ["Rot", "Lila", "Blau", "Orange", "Pink", "Hellblau", "Gelb", "Schwarz", "Grün"];

const mobile_colors = ["#830000", "#FF00C7", "#D6741A", "#4D009A", "#DED609", "#03318A", "#06573A", "#05B4FF", "#000000"];
const mobile_color_names = ["Rot", "Pink", "Orange", "Lila", "Gelb", "Blau", "Grün", "Hellblau", "Schwarz"];

export default function ({currentColor, setCurrentColor}) {
    return (
        <>
            <div className="color_box">
                <h2>Farbe</h2>
            </div>

            <div className="colors show-desktop">
                {colors.map((color, index) => (
                    <button className="color" style={{backgroundColor: hexToRgbA(color) + "30%)",
                        borderColor: hexToRgbA(color) + "50%)"}} key={color}
                            onClick={() => setCurrentColor(color)}>
                        <h2>{color_names[index]}</h2>
                    </button>
                ))}
            </div>

            <div className="colors show-mobile">
                {mobile_colors.map((color, index) => (
                    <button className="color" style={{backgroundColor: hexToRgbA(color) + "30%)",
                        borderColor: hexToRgbA(color) + "50%)"}} key={color}
                            onClick={() => setCurrentColor(color)}>
                        <h2>{mobile_color_names[index]}</h2>
                    </button>
                ))}
            </div>

        </>
    )
}