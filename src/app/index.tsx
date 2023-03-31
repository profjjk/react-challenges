import { Routes, Route } from 'react-router-dom';
import { Home, CircleClick, CheckoutQueue, ColorQuiz, FileExplorer } from '../pages';
import './style.scss';
import { Navbar } from '../components';

export const App = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/circle-click'} element={<CircleClick />} />
                <Route path={'/checkout-queue'} element={<CheckoutQueue />} />
                <Route path={'/color-quiz'} element={<ColorQuiz />} />
                <Route path={'/file-explorer'} element={<FileExplorer />} />
            </Routes>
        </>
    )
}