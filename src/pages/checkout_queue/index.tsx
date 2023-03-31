import { useState, FormEvent, useEffect } from 'react';
import uuid from 'react-uuid';
import './style.scss';

const customerList = [
    [12, 3, 8],
    [6],
    [22, 2],
    [14]
]

export const CheckoutQueue = () => {
    const [ queues, setQueues ] = useState<number[][]>(customerList);
    const [ newCheckout, setNewCheckout ] = useState<number>(10);
    const [ isCheckout, setIsCheckout ] = useState<boolean>(false);
    const checkoutLines = ['A', 'B', 'C', 'D'];

    useEffect(() => {
        if (isCheckout) {
            const interval = setInterval(() => {
                if (queues[0].length < 1 && queues[1].length < 1 && queues[2].length < 1 && queues[3].length < 1) {
                    setTimeout(() => {
                        setIsCheckout(false);
                        setQueues(customerList);
                        return;
                    }, 1500)
                }
                setQueues((prevQueues) =>
                    prevQueues.map((queue) => {
                        if (queue.length < 1) {
                            return [];
                        } else {
                            if (queue[0] <= 0) {
                                return [...queue.slice(1)]
                            } else {
                                return [ queue[0] - 1, ...queue.slice(1) ];
                            }
                        }
                    })
                )
            }, 500);
            return () => clearInterval(interval);
        }
    }, [isCheckout, queues])

    const addToCheckout = (e: FormEvent) => {
        e.preventDefault();
        if (newCheckout <= 0) return;
        const shortestQueue = findShortestQueue(queues);

        setQueues((prevQueues) =>
            prevQueues.map((queue, index) => {
                if (index === shortestQueue) {
                    return [...queue, newCheckout]
                } else {
                    return queue;
                }
            })
        )

    }

    const findShortestQueue = (matrix: number[][]): number => {
        let shortestQueueIndex = 0;
        let shortestQueueItems = matrix[0].reduce((total, number) => total + number, 0);

        for (let i = 1; i < matrix.length; i++) {
            let items = matrix[i].reduce((total, number) => total + number, 0);
            if (items < shortestQueueItems) {
                shortestQueueIndex = i;
                shortestQueueItems = items;
            }
        }
        return shortestQueueIndex;
    }


    return (
        <main id={'checkout-queue'}>
            <form onSubmit={addToCheckout}>
                <input
                    type={'number'}
                    onChange={(e) => setNewCheckout(e.target.valueAsNumber)}
                    value={newCheckout}
                    name={'checkout'}
                />
                <button type={'submit'}>
                    Add To Checkout
                </button>
            </form>

            <button onClick={() => setIsCheckout(!isCheckout)}>
                {isCheckout ? 'Pause' : 'Start'} Checkout
            </button>

            <div className={'queue-box'}>
                {queues.map((q: number[], index: number) => (
                    <div className={'queue'} key={uuid()}>
                        <div>{checkoutLines[index]}</div>

                        {q.map((customer: number) => (
                            <div key={uuid()}>
                                {customer}
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </main>
    )
}