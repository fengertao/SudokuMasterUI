/**
 * Copyright (c) 2018-2019,  Charlie Feng. All Rights Reserved.
 */

import React, { useContext, useState } from 'react';
import { SudokuContext } from '@/context/SudokuContext';
import { Table, Popover } from 'antd';
import Position from './Position';

const StepTable = props => {
    let { state: sudokuState } = useContext(SudokuContext);
    let [loading] = useState(false);
    let [filteredInfo, setFilteredInfo] = useState({});
    let [setSortedInfo] = useState({});

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
    };

    const content = (position, cell, refCells) => {
        return <Position position={position} cell={cell} refCells={refCells} />;
    };

    const columns = [
        {
            title: '步数',
            dataIndex: 'index',
            width: 50,
        },
        {
            title: '格',
            dataIndex: 'cell',
            width: 50,
        },
        {
            title: '消息',
            dataIndex: 'message',
            width: '50%',
        },
        {
            title: '技巧',
            dataIndex: 'techniques',
            width: '25%',
        },
        {
            title: '参考单元格',
            dataIndex: 'refCells',
            width: '25%',
        },
        {
            title: '详细',
            dataIndex: 'level',
            filters: [{ text: '0', value: 0 }, { text: '1', value: 1 }, { text: '2', value: 2 }],
            width: 70,
            filteredValue: filteredInfo.level || null,
            onFilter: (value, record) => record.level === value,
        },
        {
            title: '复盘',
            dataIndex: 'position',
            width: 50,
            render: (position, record) => (
                <span>
                    <Popover
                        placement="left"
                        content={content(position, record.cell, record.refCells)}
                        title={`第${record.index}步 ${record.cell} ${record.message}`}
                        trigger="hover"
                    >
                        查看
                    </Popover>
                </span>
            ),
        },
    ];

    return (
        <Table
            loading={loading}
            size="small"
            bordered={false}
            columns={columns}
            dataSource={sudokuState.result.resolution}
            rowKey="index"
            pagination={false}
            scroll={{ x: 'max-content', y: 610 }}
            onChange={handleChange}
            rowClassName={(record, index) => {
                let className = 'odd_row';
                if (index % 2 === 1) className = 'even_row';
                return className;
            }}
        />
    );
};
export default StepTable;
