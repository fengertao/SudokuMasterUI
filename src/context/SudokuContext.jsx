/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React from 'react';
import * as SudokuAction from './SudokuAction';

const SudokuContext = React.createContext();

const initialState = { grid: null, result: {} };

let reducer = (state, action) => {
    switch (action.type) {
        case SudokuAction.INITIAL:
            return initialState;

        case SudokuAction.UPDATE_RESULT: {
            return {
                ...initialState,
                result: action.result,
            };
        }
        default:
            return state;
    }
};

function SudokuProvider(props) {
    let [state, dispatch] = React.useReducer(reducer, initialState);
    let value = { state, dispatch };
    return <SudokuContext.Provider value={value}>{props.children}</SudokuContext.Provider>;
}

let SudokuConsumer = SudokuContext.Consumer;

export { SudokuContext, SudokuProvider, SudokuConsumer };
