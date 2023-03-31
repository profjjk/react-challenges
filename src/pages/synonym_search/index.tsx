import React, { useState } from 'react';
import { Synonym } from './types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

export const SynonymSearch = () => {
    const [ word, setWord ] = useState<string>('');
    const [ synonyms, setSynonyms ] = useState<Synonym[]>([]);
    const [ definition, setDefinition ] = useState<any>([]);

    const handleSynonymSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setDefinition([])

        fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
            .then((res: Response) => res.json())
            .then(setSynonyms)
    }

    const handleSynonymClicked = (synonym: string) => {
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${synonym}`)
            .then((res: Response) => res.json())
            .then(setDefinition)
    }

    return (
        <>
            <div className={'game-buttons'}>
                <FontAwesomeIcon icon={faX} onClick={() => {
                    setWord('');
                    setSynonyms([]);
                    setDefinition([]);
                }}/>
            </div>

            <main id={'word-search'}>
                <form onSubmit={handleSynonymSearch}>
                    <label htmlFor={'word-input'}>
                        Your Word:
                    </label>

                    <input
                        id={'word-input'}
                        value={word}
                        onChange={(e) => {
                            setWord(e.target.value)
                        }}
                    />

                    <button type={'submit'} disabled={word === ''}>
                        Submit
                    </button>
                </form>

                {definition.length > 0 ? (
                    <div id={'definition-div'}>
                        <h4>{definition[0].word}</h4>

                        {definition[0].meanings.map((def: any, resultIndex: number) => (
                            <div key={resultIndex}>
                                <p className={'partOfSpeech'}>
                                    {def.partOfSpeech}
                                </p>

                                <div className={'meanings'}>
                                    {def?.definitions.map((d: any, defIndex: number) => (
                                        <div key={defIndex}>
                                            <em>
                                                {defIndex+1}. {d.definition}
                                            </em><br/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div id={'synonyms-div'}>
                        {synonyms.map((s: Synonym) => (
                            <div key={s.word} onClick={() => handleSynonymClicked(s.word)}>
                                {s.word}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </>
    )
}