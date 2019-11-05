/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useState } from 'react';

const Cell = props => {
    let [inputValue, setInputValue] = useState('');
    let [showValue, setShowValue] = useState(props.value === '0' ? '' : props.value);
    let [candidates, setCandidates] = useState(props.value === '0' ? '123456789' : props.value);
    let [showClassName, setShowClassName] = useState();

    const constValue = props.value;
    const inputClassName = `word${props.value}`;
    const isReadOnly = constValue > 0 && constValue <= 9;
    const index = props.index;

    const handleValueChange = event => {
        let switchValue = event.target.value;
        console.log(`switchValue = ${switchValue}`);

        if (switchValue.includes('0')) {
            setInputValue('');
            setCandidates('123456789');
            setShowValue('');
            return;
        }
        if (candidates.length === 9) {
            setInputValue('');
            setCandidates(switchValue);
            setShowValue(switchValue);
            setShowClassName(`word${switchValue}`);
            return;
        }

        let newCandidates = '',
            formatted = '';
        for (let i = 1; i <= 9; i++) {
            if (candidates.includes(i) !== (switchValue === i.toString())) {
                console.log(`add`);
                newCandidates += i.toString();
                formatted += i.toString();
            } else {
                console.log(`not add`);
                formatted += '\xA0';
            }
            if (i === 3 || i === 6) {
                formatted += '\n';
            }
        }

        if (newCandidates.length === 9) {
            formatted = '';
        }

        setInputValue('');
        setCandidates(newCandidates);
        if (newCandidates.length === 1) {
            setShowValue(newCandidates);
            setShowClassName(`word${newCandidates}`);
        } else {
            setShowValue(formatted);
            setShowClassName(`candidates`);
        }
    };

    if (isReadOnly) {
        return (
            <td className="cell">
                <input className={inputClassName} readOnly type={'text'} value={constValue} />
            </td>
        );
    } else {
        return (
            <td className="cell">
                <span key={`inputspan${index}`} className="inputspan">
                    <input
                        id={`input${index}`}
                        name={`input${index}`}
                        className={inputClassName}
                        type={'text'}
                        value={inputValue}
                        onChange={handleValueChange}
                    />
                </span>
                <span key={`displayspan${index}`} className={`displayspan ${showClassName}`}>
                    {showValue}
                </span>
            </td>
        );
    }
};
export default Cell;
