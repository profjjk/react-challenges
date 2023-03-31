import { MouseEvent, useEffect, useState } from 'react';
import questionList from './questions.json'
import './style.scss';

type Question = {
    color: string,
    options: string[]
}

export const ColorQuiz = () => {
    const [ questionIndex, setQuestionIndex ] = useState<number>(0);
    const [ questions ] = useState<Question[]>(questionList);
    const [ result, setResult ] = useState<boolean>(false);

    const handleAnswerSelection = (e: MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        const answer = e.currentTarget.innerHTML;

        if (answer === questions[questionIndex].color) {
            setResult(true)
            setTimeout(() => {
                setResult(false);
                if (questionIndex < questions.length-1) {
                    setQuestionIndex((prev: number) => prev + 1);
                } else {
                    setQuestionIndex(0)
                }
            }, 2000);
        }
    }

    useEffect(() => {}, [questionIndex]);

    return (
        <main id={'color-picker'}>
            <div className={'color-box'} style={{ backgroundColor: questions[questionIndex].color }} />

            <div className={'button-div'}>
                {questions[questionIndex].options.map((option: string, index: number) => (
                    <div key={index} onClick={handleAnswerSelection}>
                        {option}
                    </div>
                ))}
            </div>

            {result && <p>Correct</p>}
        </main>
    )
}

export default ColorQuiz;
