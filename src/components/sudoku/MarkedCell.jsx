/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { Component } from 'react';
import './styles.css';

export default class MarkedCell extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let tdClassName, showValue;
        const value = this.props.value;
        const isKeyCell = this.props.isKeyCell;
        const isRefCell = this.props.isRefCell;

        if (value.length === 1) {
            tdClassName = `word${value}`;
            showValue = value;
        } else if (value === '123456789') {
            //Todo
            tdClassName = 'word1';
            showValue = '\xA0';
        } else {
            tdClassName = 'd0';
            showValue = '';
            showValue += value.includes('1') ? '1' : '\xA0';
            showValue += value.includes('2') ? '2' : '\xA0';
            showValue += value.includes('3') ? '3' : '\xA0';
            showValue += '\n';
            showValue += value.includes('4') ? '4' : '\xA0';
            showValue += value.includes('5') ? '5' : '\xA0';
            showValue += value.includes('6') ? '6' : '\xA0';
            showValue += '\n';
            showValue += value.includes('7') ? '7' : '\xA0';
            showValue += value.includes('8') ? '8' : '\xA0';
            showValue += value.includes('9') ? '9' : '\xA0';
        }

        if (isRefCell) {
            tdClassName += ' slowlyBlink';
        }
        if (isKeyCell) {
            return (
                <td className={tdClassName + ' ripple'}>
                    {showValue}
                    <span />
                    <span />
                </td>
            );
        } else {
            return <td className={tdClassName}>{showValue}</td>;
        }
    }
}
