import "./MainMenu.css";


export default function ({setPage, setQuestionAmount}) {

    const setQuestions = (amount) => {
        setPage("InGame");
        setQuestionAmount(amount);
    }

    return (
        <>
            <div className="title_box">
                <h2>Allgemeinwissen</h2>
            </div>

            <div className="chooser_row">
                {[1,2,3].map((amount) => (
                    <button className={"chooser"} onClick={() => setQuestions(amount * 10)}>
                        <h2>{amount * 10}</h2>
                        <h3>Fragen</h3>
                    </button>
                ))}
            </div>
            <h2 className="impressum" onClick={() => setPage("Impressum")}>Impressum</h2>
            <h2 className="privacy" onClick={() => setPage("Privacy")}>Datenschutzerklärung</h2>
        </>
    )
}