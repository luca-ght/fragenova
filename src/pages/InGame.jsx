import "./InGame.css";
import Questions from "../questions.json";
import {useEffect, useState} from "react";

export default function ({questionAmount, setCorrectAnswers, setPage, page}) {
    const [previousQuestions, setPreviousQuestions] = useState(localStorage.getItem("prevQuestions")
        ? JSON.parse(localStorage.getItem("prevQuestions")) : []);

    const [gameQuestions, setGameQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({});
    const [chosenAnswer, setChosenAnswer] = useState(0);
    const [resultScreen, setResultScreen] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);

    const pullRandomQuestions = () => {
        let availableQuestions = Questions.filter((_, index) => !previousQuestions.includes(index + 1));

        if (availableQuestions.length < questionAmount) {
            setPreviousQuestions([]);
            availableQuestions = Questions;
        }

        const selectedQuestions = [];
        while (selectedQuestions.length < questionAmount && availableQuestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableQuestions.length);
            const question = availableQuestions[randomIndex];
            const randomAnswers = [...question.answers];

            for (let i = randomAnswers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [randomAnswers[i], randomAnswers[j]] = [randomAnswers[j], randomAnswers[i]];
            }
            selectedQuestions.push({ ...question, randomAnswers });
            const selectedQuestionId = Questions.indexOf(availableQuestions[randomIndex]) + 1;
            availableQuestions.splice(randomIndex, 1);
            setPreviousQuestions(prev => [...prev, selectedQuestionId]);
        }

        return selectedQuestions;
    };

    const pullNext = () => {
        setGameQuestions(questions => {
            if (questions.length === 0) {
                setPage("Ending");
                return questions;
            }
            const randomIndex = Math.floor(Math.random() * questions.length);
            const selectedQuestion = questions[randomIndex];
            const updatedQuestions = questions.filter((_, index) => index !== randomIndex);
            setCurrentQuestion(selectedQuestion);
            return updatedQuestions;
        });
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setGameQuestions(pullRandomQuestions());
            pullNext();
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        localStorage.setItem("prevQuestions", JSON.stringify(previousQuestions));
    }, [previousQuestions]);

    const answerQuestion = (answer) => {
        if (resultScreen) return;

        setChosenAnswer(answer);
        setResultScreen(true);

        if (currentQuestion.answers[0] === currentQuestion.randomAnswers[answer]) {
            setCorrectAnswers(correct => correct+1);
        }
    }

    useEffect(() => {
        setCountdownStarted(resultScreen);

        if (resultScreen) {
            const timeout = setTimeout(() => {
                setResultScreen(false);
                setCountdownStarted(false);
                pullNext();
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [resultScreen]);

    const isCorrect = (answer) => resultScreen && currentQuestion.answers[0] === answer;
    const isWrong = (answer, index) => resultScreen && currentQuestion.answers[0] !== answer && chosenAnswer === index;

    const parts = currentQuestion?.title?.split(/(".*?")/g);


    return (
        <div className="in-game-page">
            <div className="zähler">
                <h2>{questionAmount - gameQuestions.length}/{questionAmount}</h2>
            </div>
            <div className="frage">
                <h2>
                    {parts?.map((part, index) => {
                        if (part.startsWith('"') && part.endsWith('"')) {
                            const innerText = part.slice(1, -1);
                            return (
                                <span key={index} className="text-italic">"{innerText}"</span>
                            );
                        }
                        return part;
                    })}
                </h2>
            </div>
            {currentQuestion?.randomAnswers?.map((answer, index) => <div className={"aw"
                + (resultScreen ? " btn-disabled" : "")
                + (isCorrect(answer) ? " aw-correct" : (isWrong(answer, index) ? " aw-wrong" : ""))
            } key={index} onClick={(event) => {
                event.currentTarget.blur();
                answerQuestion(index)}}>
                <h2>{answer}</h2>
            </div>)}


            {resultScreen && <div className="progress-bar">
            <div className={"progress-inner" + (countdownStarted ? " progress-zero" : "" )}/>
            </div>}

        </div>
    )
}