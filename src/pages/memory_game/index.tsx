import { useState, MouseEvent } from 'react';
import { Coordinates } from './types';
import './style.scss';

const createBooleanGrid = (matrix: number[][]) => new Array(matrix.length).fill('')
    .map(() => new Array(matrix[0].length).fill(false))

export const MemoryGame = (): JSX.Element => {
    const [ grid ] = useState<number[][]>([
        [6, 3, 4, 5],
        [2, 5, 1, 2],
        [1, 3, 6, 4]
    ]);
    const [ revealedGrid, setRevealedGrid ] = useState<boolean[][]>(createBooleanGrid(grid));
    const [ prevClick, setPrevClick ] = useState<Coordinates | null>(null);


    // const auditGrid = () => {
    //     const revealedCards = document.querySelectorAll('.card p');
    //     revealedCards.forEach((card: Element) => {
    //         if (card.innerHTML) {
    //             card.classList.add('revealed');
    //         }
    //     })
    // }

    const handleCardClick = (e: MouseEvent<HTMLParagraphElement>, rowIndex: number, colIndex: number) => {
        e.preventDefault();
        const newRevealedGrid = [...revealedGrid];
        newRevealedGrid[rowIndex][colIndex] = true;
        setRevealedGrid(newRevealedGrid);

        if (prevClick) {
            if (grid[prevClick.x][prevClick.y] === grid[rowIndex][colIndex]) {
                setPrevClick(null);
                // auditGrid();
            } else {
                setTimeout(() => {
                    newRevealedGrid[rowIndex][colIndex] = false;
                    newRevealedGrid[prevClick.x][prevClick.y] = false;
                    setPrevClick(null);
                }, 1000)
            }
        } else {
            setPrevClick({ x: rowIndex, y: colIndex });
        }
    }


    return (
        <main id={'memory'}>
            <div className={'game-box'}>

                {grid.map((row: number[], rowIndex: number) => (
                    <div className={'row'} key={rowIndex}>

                        {row.map((card: number, colIndex: number) => (
                            <div className={'card'} key={colIndex}>
                                <p onClick={(e) => handleCardClick(e, rowIndex, colIndex)}>
                                    {revealedGrid[rowIndex][colIndex] && card}
                                </p>
                            </div>
                        ))}

                    </div>
                ))}

            </div>
        </main>
    )
}

export default MemoryGame;

// TODO: Fix memory game. Logic is still faulty when clicking multiple cards quickly.