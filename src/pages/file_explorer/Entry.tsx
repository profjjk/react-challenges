import { useState } from 'react';
import { TEntry } from './types';

export const Entry = ({ entry, indent }: { entry: TEntry, indent: number }) => {
    const [ isExpanded, setIsExpanded ] = useState<boolean>(false);

    if (!entry.children) {
        return (
            <div className={'file'} style={{ paddingLeft: `${indent+3}rem` }} key={entry.name}>
                {entry.name}
            </div>
        )
    } else {
        return (
            <div>
                <div className={'directory'}
                     style={{ paddingLeft: `${indent+3}rem`}}
                     key={entry.name}
                     onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? '-' : '+'} {entry.name}
                </div>

                {isExpanded &&
                    entry.children?.map((child: TEntry) => <Entry entry={child} indent={indent+3} />)
                }

            </div>
        )
    }
}