import { Routes, Route } from 'react-router-dom';
import { Home, CircleClick, CheckoutQueue, ColorQuiz, FileExplorer, SynonymSearch, MemoryGame } from '../pages';
import { Navbar } from '../components';
import './style.scss';

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
                <Route path={'/synonym-search'} element={<SynonymSearch />} />
                <Route path={'/memory-game'} element={<MemoryGame />} />
            </Routes>
        </>
    )
}