import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import './style.scss';


export const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className={'navbar'}>
            <FontAwesomeIcon icon={faHouse} onClick={() => navigate('/')} />
        </header>
    )
}