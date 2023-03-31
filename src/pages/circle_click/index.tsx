import { MouseEvent, useState } from 'react';
import { Navbar } from '../../components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faRotateRight, faX } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

type Circle = {
    x: number,
    y: number
}

export const CircleClick = (): JSX.Element => {
    const [ circles, setCircles ] = useState<Circle[]>([]);
    const [ poppedCircles, setPoppedCircles ] = useState<Circle[]>([]);

    const handleCreateCircle = (e: MouseEvent) => {
        e.preventDefault();
        setCircles([...circles, { x: e.pageX, y: e.pageY }]);
    }

    const handleUndo = (e: MouseEvent<HTMLOrSVGElement>) => {
        e.preventDefault();
        if (circles.length > 0) {
            setPoppedCircles([...poppedCircles, circles[circles.length-1]])
            setCircles(circles.splice(0, circles.length-1));
        }
    }

    const handleRedo = (e: MouseEvent<HTMLOrSVGElement>) => {
        e.preventDefault();
        if (poppedCircles.length > 0) {
            let popC = poppedCircles[poppedCircles.length-1]
            setCircles([...circles, popC])
            setPoppedCircles(poppedCircles.splice(0, poppedCircles.length-1))
        }
    }

    return (
        <>
            <Navbar />

            <div className={'game-buttons'}>
                <FontAwesomeIcon icon={faRotateLeft} onClick={handleUndo} />
                <FontAwesomeIcon icon={faRotateRight} onClick={handleRedo} />
                <FontAwesomeIcon icon={faX} onClick={() => {
                    setCircles([]);
                    setPoppedCircles([]);
                }}/>
            </div>


            <main id={'circle-click'} onClick={handleCreateCircle}>
                {circles.length < 1 ?
                    (
                        <p>Click anywhere on the screen to place a circle.</p>
                    ) : (
                        circles.map((circle: Circle, index: number) => (
                            <div className={'circle'} key={index} style={{
                                left: `${circle.x - 25}px`,
                                top: `${circle.y - 25}px`
                            }}>
                                {index + 1}
                            </div>
                        ))
                    )
                }
            </main>
        </>
    )
}