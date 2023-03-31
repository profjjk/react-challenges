import { Link } from 'react-router-dom';
import { App } from './types';
import apps from './mini-apps.json';
import './style.scss';

export const Home = () => {
    return (
        <main id={'home'}>
            {apps.map((app: App, index: number) => (
                <div className={'app-link'} key={index}>
                    <div>{app.name}</div>
                    <Link to={app.url} style={{ backgroundImage: app.gif && `url(${app.gif})` }} />
                </div>
            ))}
        </main>
    )
}