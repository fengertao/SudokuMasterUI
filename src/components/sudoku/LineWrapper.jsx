import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
//Todo move into a common component
import Styles from './gridStyles.css';

//Todo move into a common component
export default class LineWrap extends PureComponent {
    static propTypes = {
        title: PropTypes.string,
        lineClampNum: PropTypes.number,
    };

    render() {
        const { title, lineClampNum } = this.props;
        return (
            <Tooltip placement="topLeft" title={title}>
                <span className={Styles.ellipsis_col} style={{ WebkitLineClamp: lineClampNum }}>
                    {title}
                </span>
            </Tooltip>
        );
    }
}
