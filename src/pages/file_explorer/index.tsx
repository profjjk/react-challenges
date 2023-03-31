import { TEntry } from './types';
import { Entry } from './Entry';
import directory from './directory.json';
import './style.scss';


export const FileExplorer = () => {
    return (
        <main id={'file-explorer'}>
            <div className={'directory-box'}>
                {directory.map((child: TEntry | File, index: number) => (
                    <div key={index}>
                        <Entry entry={child} indent={0} />
                    </div>
                ))}
            </div>
        </main>
    )
}