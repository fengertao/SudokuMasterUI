/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { Component } from 'react';

export default class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let tdClassName, inputClassName, showValue;
        if (this.props.value > 0) {
            tdClassName = 'cell word' + this.props.value;
            inputClassName = 'word' + this.props.value;
            showValue = this.props.value;
        } else {
            //Todo
            tdClassName = 'cell';
            inputClassName = 'writeInput';
            showValue = '';
        }

        return (
            <td className={tdClassName}>
                <input
                    className={inputClassName}
                    disabled
                    type={'text'}
                    cellPadding={0}
                    cellSpacing={0}
                    border={0}
                    value={showValue}
                />
            </td>
        );
    }
}
