import { Routes, Route } from 'react-router-dom';
import { Home, CircleClick } from '../pages';
import './style.scss';

export const App = () => {
    return (
        <Routes>
            <Route path={'/'} element={<Home />} />
            <Route path={'/circle-click'} element={<CircleClick />} />
        </Routes>
    )
}